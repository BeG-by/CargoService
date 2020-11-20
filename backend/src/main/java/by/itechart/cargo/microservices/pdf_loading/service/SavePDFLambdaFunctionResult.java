package by.itechart.cargo.microservices.pdf_loading.service;

public class SavePDFLambdaFunctionResult {
    String message;
    boolean isErrorOccurred;

    public SavePDFLambdaFunctionResult(){

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isErrorOccurred() {
        return isErrorOccurred;
    }

    public void setErrorOccurred(boolean errorOccurred) {
        isErrorOccurred = errorOccurred;
    }
}
