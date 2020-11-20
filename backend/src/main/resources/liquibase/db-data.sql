-- Invoices --

INSERT INTO public.invoice("number", status, registration_date, checking_date, close_date, id_shipper, id_consignee,
                           id_product_owner, id_driver, id_user_registration, id_user_checking, id_client_company,
                           comment)
VALUES ('TTN3499013', 'ACCEPTED', '2020-11-01', '2020-11-01', null, 1, 2, 1, 5, 2, 3, 2, 'Its ok');

INSERT INTO public.invoice("number", status, registration_date, checking_date, close_date, id_shipper, id_consignee,
                           id_product_owner, id_driver, id_user_registration, id_user_checking, id_client_company,
                           comment)
VALUES ('TTN4314411', 'ACCEPTED', '2020-11-01', '2020-11-01', null, 2, 3, 1, 12, 2, 3, 2, 'Its ok');

INSERT INTO public.invoice("number", status, registration_date, checking_date, close_date, id_shipper, id_consignee,
                           id_product_owner, id_driver, id_user_registration, id_user_checking, id_client_company,
                           comment)
VALUES ('TTN5599515', 'ACCEPTED', '2020-11-01', '2020-11-01', null, 1, 3, 1, 13, 2, 3, 2, 'Its ok');

INSERT INTO public.invoice("number", status, registration_date, checking_date, close_date, id_shipper, id_consignee,
                           id_product_owner, id_driver, id_user_registration, id_user_checking, id_client_company,
                           comment)
VALUES ('TTN1399063', 'ACCEPTED', '2020-11-01', '2020-11-01', null, 3, 2, 1, 14, 2, 3, 2, 'Its ok');

INSERT INTO public.invoice("number", status, registration_date, checking_date, close_date, id_shipper, id_consignee,
                           id_product_owner, id_driver, id_user_registration, id_user_checking, id_client_company,
                           comment)
VALUES ('TTN3347864', 'ACCEPTED', '2020-11-01', '2020-11-01', null, 3, 2, 1, 17, 2, 3, 2, 'Its ok');


-- Products --

INSERT INTO public.product(
    name, quantity_measure, quantity, mass_measure, currency, mass, price, status, lost_quantity, comment, id_invoice)
VALUES ('Beer', 'BARREL', 3, 'KG', 'BYN', '132', '1330', 'ACCEPTED', null, null, 1);

INSERT INTO public.product(
    name, quantity_measure, quantity, mass_measure, currency, mass, price, status, lost_quantity, comment, id_invoice)
VALUES ('Beer', 'BARREL', 3, 'KG', 'BYN', '132', '1330', 'ACCEPTED', null, null, 2);

INSERT INTO public.product(
    name, quantity_measure, quantity, mass_measure, currency, mass, price, status, lost_quantity, comment, id_invoice)
VALUES ('Beer', 'BARREL', 3, 'KG', 'BYN', '132', '1330', 'ACCEPTED', null, null, 3);

INSERT INTO public.product(
    name, quantity_measure, quantity, mass_measure, currency, mass, price, status, lost_quantity, comment, id_invoice)
VALUES ('Beer', 'BARREL', 3, 'KG', 'BYN', '132', '1330', 'ACCEPTED', null, null, 4);

INSERT INTO public.product(
    name, quantity_measure, quantity, mass_measure, currency, mass, price, status, lost_quantity, comment, id_invoice)
VALUES ('Beer', 'BARREL', 3, 'KG', 'BYN', '132', '1330', 'ACCEPTED', null, null, 5);


-- Waybills --

INSERT INTO public.waybill(waybill_status, id_invoice, id_auto, departure_date, distance, arrival_date,
                           id_client_company)
VALUES ('CURRENT', 1, 1, '2020-11-11', 1000, '2020-11-17', 2);

INSERT INTO public.waybill(waybill_status, id_invoice, id_auto, departure_date, distance, arrival_date,
                           id_client_company)
VALUES ('CURRENT', 2, 2, '2020-11-29', 1000, '2020-11-29', 2);

INSERT INTO public.waybill(waybill_status, id_invoice, id_auto, departure_date, distance, arrival_date,
                           id_client_company)
VALUES ('CURRENT', 3, 3, '2020-11-03', 1000, '2020-11-30', 2);

INSERT INTO public.waybill(waybill_status, id_invoice, id_auto, departure_date, distance, arrival_date,
                           id_client_company)
VALUES ('CURRENT', 4, 1, '2020-11-20', 1000, '2020-11-22', 2);

INSERT INTO public.waybill(waybill_status, id_invoice, id_auto, departure_date, distance, arrival_date,
                           id_client_company)
VALUES ('CURRENT', 5, 2, '2020-11-25', 1000, '2020-11-28', 2);


-- Points --

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (1, '27.567444', '53.893009', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (1, '32.0503663', '54.7903112', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (2, '27.567444', '53.893009', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (2, '32.0503663', '54.7903112', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (3, '27.567444', '53.893009', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (3, '32.0503663', '54.7903112', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (4, '27.567444', '53.893009', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (4, '32.0503663', '54.7903112', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (5, '27.567444', '53.893009', false, null);

INSERT INTO public.point(id_waybill, longitude, latitude, passed, passage_date)
VALUES (5, '32.0503663', '54.7903112', false, null);
