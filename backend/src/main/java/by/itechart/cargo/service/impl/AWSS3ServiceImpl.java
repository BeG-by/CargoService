package by.itechart.cargo.service.impl;


import by.itechart.cargo.service.AWSS3Service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;


@Service
@Slf4j
public class AWSS3ServiceImpl implements AWSS3Service {

    private AmazonS3 amazonS3;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.s3.postfix}")
    private String postfix;

    @Autowired
    public AWSS3ServiceImpl(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    @Override
    @Async
    public void uploadFile(String fileInBase64, String userId) {

        String fileName = userId + postfix;

        final byte[] bytes = Base64.decodeBase64(fileInBase64.substring(fileInBase64.indexOf(",") + 1));
        InputStream stream = new ByteArrayInputStream(bytes);

        ObjectMetadata metadata = new ObjectMetadata();

        metadata.setContentLength(bytes.length);
        metadata.setContentType("image/png");
        metadata.setCacheControl("public, max-age=31536000");

        amazonS3.putObject(bucketName, fileName, stream, metadata);
        amazonS3.setObjectAcl(bucketName, fileName, CannedAccessControlList.PublicReadWrite);

        log.info("File was successfully uploaded to S3");

    }


    @Override
    public String getFile(String userId) {
        String fileName = userId + postfix;
        final boolean isFileExist = amazonS3.doesObjectExist(bucketName, fileName);
        return isFileExist ? amazonS3.getUrl(bucketName, fileName).toString() : null;
    }


}
