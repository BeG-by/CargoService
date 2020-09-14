package by.itechart.cargo.dto.model_dto.invoice;

import by.itechart.cargo.model.enumeration.InvoiceStatus;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class InvoiceStatusTypeConstraintValidator implements ConstraintValidator<InvoiceStatusType, String> {
    public void initialize(InvoiceStatusType constraint) {
    }

    public boolean isValid(String obj, ConstraintValidatorContext context) {
        boolean isType = false;
        for (InvoiceStatus status : InvoiceStatus.values()) {
            if (obj.equals(status.name())) {
                isType = true;
                break;
            }
        }
        return isType;
    }
}
