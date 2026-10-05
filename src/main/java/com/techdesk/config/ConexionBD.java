
package com.techdesk.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionBD {

    private static final String URL = "jdbc:mysql://localhost:3306/techdesk";
    private static final String USUARIO = "root";

    public static Connection conectar() {
        String contrasena = System.getenv("TECHDESK_DB_PASSWORD");

        if (contrasena == null || contrasena.isEmpty()) {
            System.out.println(
                "Error: configura la variable de entorno TECHDESK_DB_PASSWORD."
            );
            return null;
        }

        try {
            Connection conexion = DriverManager.getConnection(
                URL,
                USUARIO,
                contrasena
            );

            System.out.println("¡Conexión exitosa a la base de datos!");
            return conexion;

        } catch (SQLException e) {
            System.out.println("Error al conectar con la base de datos:");
            System.out.println(e.getMessage());
            return null;
        }
    }
}
