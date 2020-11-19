package by.itechart.cargo.microservices.pdf_loading;

import by.itechart.cargo.model.Role;
import by.itechart.cargo.security.JwtTokenUtil;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Service
public class PDFLoadingMicroservice implements MessageListener {
    private static String BUCKET_NAME = "cargo-app";
    private static final int EXPIRATION_TIME_MILLIS = 1000 * 60 * 5; //5 minutes
    private static final String FILE_EXTENSION = ".pdf";

    private final JwtTokenUtil jwtTokenUtil;
    private final AmazonLambdaService lambdaService;
    private final AmazonS3 amazonS3;
    private final PDFResponseMessagePublisher responsePublisher;

    @Autowired
    public PDFLoadingMicroservice(JwtTokenUtil jwtTokenUtil,
                                  AmazonLambdaService lambdaService,
                                  AmazonS3 amazonS3,
                                  @Lazy PDFResponseMessagePublisher responsePublisher) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.lambdaService = lambdaService;
        this.amazonS3 = amazonS3;
        this.responsePublisher = responsePublisher;
    }

    @Override
    public void onMessage(Message message, byte[] bytes) {
        String messageBody = message.toString();
        messageBody = messageBody.substring(7);

        Long responseReceiverId = parseResponceReceiverId(messageBody);
        String url = parseURL(messageBody);


        String pdfName = generateNameForFile(responseReceiverId);
        SavePdfLambdaFunctionParams params = new SavePdfLambdaFunctionParams(url, pdfName, BUCKET_NAME);

        lambdaService.savePdf(params);
        responsePublisher.publish(responseReceiverId, generatePresignedUrl(BUCKET_NAME, pdfName));
    }

    private String parseURL(String messageBody) {
        String[] arr = messageBody.split("_", 2);
        return arr[1];
    }

    private Long parseResponceReceiverId(String messageBody) {
        String[] arr = messageBody.split("_", 2);
        return Long.valueOf(arr[0]);
    }

    private String generatePresignedUrl(String bucketName, String fileName) {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += EXPIRATION_TIME_MILLIS;
        expiration.setTime(expTimeMillis);

        GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucketName, fileName)
                .withMethod(HttpMethod.GET)
                .withExpiration(expiration);

        return amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString();
    }

    private String generateNameForFile(Long userId) {
        return userId + "/" + LocalDate.now() + "_" + UUID.randomUUID() + FILE_EXTENSION;
    }
}
