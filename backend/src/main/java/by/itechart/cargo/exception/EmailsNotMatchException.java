package by.itechart.cargo.exception;

public class EmailsNotMatchException extends Exception {

    public EmailsNotMatchException() {
        super();
    }

    public EmailsNotMatchException(String message) {
        super(message);
    }

    public EmailsNotMatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public EmailsNotMatchException(Throwable cause) {
        super(cause);
    }

    protected EmailsNotMatchException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
