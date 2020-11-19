package by.itechart.cargo.microservices.pdf_loading;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SavePdfLambdaFunctionParams {
    private String url;
    private String pdfName;
    private String bucketName;
}
