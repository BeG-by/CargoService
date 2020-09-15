package by.itechart.cargo.dto.model_dto.invoice;

import javax.validation.Constraint;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = InvoiceStatusTypeConstraintValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface InvoiceStatusType {
    String message();
}
