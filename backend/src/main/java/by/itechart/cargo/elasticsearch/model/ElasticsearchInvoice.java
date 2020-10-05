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
    Long id;

    @Field(type = FieldType.Text)
    String number;

    @Field(type = FieldType.Long)
    Long clientCompanyId;

    public static ElasticsearchInvoice fromInvoice(Invoice invoice){
        return new ElasticsearchInvoice(invoice.getId(), invoice.getNumber(), invoice.getClientCompany().getId());
    }
}
