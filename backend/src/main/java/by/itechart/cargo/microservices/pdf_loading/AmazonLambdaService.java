package by.itechart.cargo.microservices.pdf_loading;

import com.amazonaws.services.lambda.invoke.LambdaFunction;

public interface AmazonLambdaService {

    @LambdaFunction(functionName = "vladislav-save-pdf-to-s3")
    void savePdf(SavePdfLambdaFunctionParams params);
}
