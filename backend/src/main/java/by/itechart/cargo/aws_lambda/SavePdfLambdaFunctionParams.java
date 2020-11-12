package by.itechart.cargo.aws_lambda;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SavePdfLambdaFunctionParams {
    private String url;
    private String pdfName;
    private String bucketName;
}
