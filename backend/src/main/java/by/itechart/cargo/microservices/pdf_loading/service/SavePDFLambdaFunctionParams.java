package by.itechart.cargo.microservices.pdf_loading.service;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SavePDFLambdaFunctionParams {
    private String url;
    private String pdfName;
    private String bucketName;
}
