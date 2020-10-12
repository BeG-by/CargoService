package by.itechart.cargo.service;

public interface AWSS3Service {

    void uploadFile(String fileInBase64 , String userId);

    String getFile(String id);

}
