package by.itechart.cargo.microservices.pdf_loading.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

import static by.itechart.cargo.microservices.pdf_loading.Utils.parseResponseReceiverId;
import static by.itechart.cargo.microservices.pdf_loading.Utils.parseURL;

@Service
@Slf4j
public class PDFLoadingMicroservice implements MessageListener {

    @Value("${aws.s3.bucket}")
    private String BUCKET_NAME;

    @Value("${aws.presigned_url.expiration_time_min}")
    private int EXPIRATION_TIME_MIN;

    private static final String FILE_EXTENSION = ".pdf";

    private final AmazonLambdaService lambdaService;
    private final AmazonS3 amazonS3;
    private final PDFResponseMessagePublisher responsePublisher;

    @Autowired
    public PDFLoadingMicroservice(AmazonLambdaService lambdaService,
                                  AmazonS3 amazonS3,
                                  @Lazy PDFResponseMessagePublisher responsePublisher) {
        this.lambdaService = lambdaService;
        this.amazonS3 = amazonS3;
        this.responsePublisher = responsePublisher;
    }

    @Override
    public void onMessage(Message message, byte[] bytes) {
        log.info("Receive message for pdf loading");
        Long responseReceiverId = parseResponseReceiverId(message);
        String url = parseURL(message);

        String pdfName = generateNameForFile(responseReceiverId);
        SavePDFLambdaFunctionParams params = new SavePDFLambdaFunctionParams(url, pdfName, BUCKET_NAME);

        log.info("Send command to lambda service");
        SavePDFLambdaFunctionResult savePDFLambdaFunctionResult = lambdaService.savePdf(params);
        if (savePDFLambdaFunctionResult.isErrorOccurred) {
            log.error("Error during lambda execution, error message: " + savePDFLambdaFunctionResult.message);
        } else {
            log.info("Success, PDF was load to S3");
            responsePublisher.publish(responseReceiverId, generatePresignedUrl(BUCKET_NAME, pdfName));
        }
    }

    private String generatePresignedUrl(String bucketName, String fileName) {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += EXPIRATION_TIME_MIN * 60 * 1000;
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
