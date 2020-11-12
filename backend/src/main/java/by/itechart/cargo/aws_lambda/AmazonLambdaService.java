package by.itechart.cargo.aws_lambda;

import com.amazonaws.services.lambda.invoke.LambdaFunction;

public interface AmazonLambdaService {

    @LambdaFunction(functionName = "vladislav-save-pdf-to-s3")
    void savePdf(SavePdfLambdaFunctionParams params);
}
