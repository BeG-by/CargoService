package by.itechart.cargo.elasticsearch.model;

import by.itechart.cargo.model.Waybill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(indexName = "waybill")
@Builder
public class ElasticsearchWaybill {

    @Id
    private Long id;

    @Field(type = FieldType.Keyword)
    private String invoiceNumber;

    @Field(type = FieldType.Long)
    private Long checkingUserId;

    @Field(type = FieldType.Long)
    private Long driverId;

    @Field(type = FieldType.Long)
    private Long clientCompanyId;

    public static ElasticsearchWaybill fromWaybill(Waybill waybill) {
        return ElasticsearchWaybill.builder()
                .id(waybill.getId())
                .checkingUserId(waybill.getInvoice().getCheckingUser().getId())
                .driverId(waybill.getInvoice().getDriver().getId())
                .invoiceNumber(waybill.getInvoice().getNumber()).build();
    }
}
