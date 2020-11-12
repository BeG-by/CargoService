package by.itechart.cargo.service.impl;

import by.itechart.cargo.aws_lambda.AmazonLambdaService;
import by.itechart.cargo.aws_lambda.SavePdfLambdaFunctionParams;
import by.itechart.cargo.model.Role;
import by.itechart.cargo.security.JwtTokenUtil;
import by.itechart.cargo.service.PageLoaderService;
import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;
import java.util.UUID;

@Service
@Slf4j
public class PageLoader implements PageLoaderService {
    private static final String FILE_EXTENSION = ".pdf";
    private static final int EXPIRATION_TIME_MILLIS = 1000 * 60 * 5; //5 minutes

    @Value("${aws.s3.bucket}")
    private String bucketName;

    private final JwtTokenUtil jwtTokenUtil;
    private final AmazonLambdaService lambdaService;
    private final AmazonS3 amazonS3;

    @Autowired
    public PageLoader(JwtTokenUtil jwtTokenUtil, AmazonLambdaService lambdaService, AmazonS3 amazonS3) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.lambdaService = lambdaService;
        this.amazonS3 = amazonS3;
    }

    @Override
    public String savePage(String url) {
        String fileName = generateNameForFile();
        lambdaService.savePdf(new SavePdfLambdaFunctionParams(url, fileName, bucketName));
        return generatePresignedUrl(bucketName, fileName);
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

    private String generateNameForFile() {
        Set<Role> roles = jwtTokenUtil.getJwtUser().getRoles();
        Role role = roles.stream().findFirst().get();
        return jwtTokenUtil.getCurrentCompanyId() + "_" + jwtTokenUtil.getJwtUser().getClientCompany().getName() + "/"
                + role.getRole().toString() + "/"
                + jwtTokenUtil.getJwtUser().getId() + "/"
                + LocalDate.now() + "_" + UUID.randomUUID() + FILE_EXTENSION;
    }
}
