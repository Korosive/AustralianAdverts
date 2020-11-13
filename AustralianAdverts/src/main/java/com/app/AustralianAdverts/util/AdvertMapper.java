package com.app.AustralianAdverts.util;

import com.app.AustralianAdverts.model.Advert;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class AdvertMapper implements RowMapper<Advert> {
    @Override
    public Advert mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Advert(
                resultSet.getObject("advert_id", UUID.class),
                resultSet.getObject("user_id", UUID.class),
                resultSet.getString("title"),
                resultSet.getString("description"),
                resultSet.getDate("date_created"),
                resultSet.getString("primary_contact_method"),
                resultSet.getString("primary_contact_info")
        );
    }
}
