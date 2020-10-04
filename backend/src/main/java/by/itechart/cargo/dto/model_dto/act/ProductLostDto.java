package by.itechart.cargo.dto.model_dto.act;

import by.itechart.cargo.dto.validation.EnumNamePattern;
import by.itechart.cargo.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductLostDto {

    @NotNull(message = "Product id is mandatory")
    @Positive(message = "Id cannot be negative or zero")
    private Long id;

    @NotNull (message = "Product status is mandatory")
    @EnumNamePattern(regexp = "ACCEPTED|DELIVERED|VERIFIED|SPOILED|STOLEN|CONFISCATED|DAMAGED_IN_CRASH",
            message = "Type must be one of ProductStatus types")
    private Product.Status productStatus;

    @NotNull(message = "Comment is mandatory")
    @Size(max = 500, message = "Comment is too long (max is 500 symbols)")
    private String comment;

    @Positive(message = "Lost quantity cannot be negative or zero")
    private Integer lostQuantity;

}
