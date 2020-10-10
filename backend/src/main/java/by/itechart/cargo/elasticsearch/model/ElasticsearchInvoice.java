package by.itechart.cargo.elasticsearch.model;

import by.itechart.cargo.model.Invoice;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "invoice")
public class ElasticsearchInvoice {

    @Id
    private Long id;

    @Field(type = FieldType.Keyword)
    private String number;

    @Field(type = FieldType.Long)
    private Long clientCompanyId;

    @Field(type = FieldType.Long)
    private Long registrationUserId;

    @Field(type = FieldType.Long)
    private Long checkingUserId;

    @Field(type = FieldType.Long)
    private Long driverId;

    public static ElasticsearchInvoice fromInvoice(Invoice invoice) {
        return new ElasticsearchInvoice(invoice.getId(),
                invoice.getNumber(),
                invoice.getClientCompany().getId(),
                invoice.getRegistrationUser().getId(),
                invoice.getCheckingUser().getId(),
                invoice.getDriver().getId());
    }
}
