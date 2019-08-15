package pl.jlpt.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "Uzytkownicy")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "NazwaUzytkownika")
    private String username;

    @Column(name = "Email")
    private String email;

    @Column(name = "Haslo")
    private String password;

    @Column(name = "OstatniaAktywnosc")
    private Timestamp lastActiveTime;

    @Column(name = "RodzajUzytkownika")
    private boolean isAdmin;

    public User(String username, String email, String password, boolean isAdmin) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }

    public long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Timestamp getLastActiveTime() {
        return lastActiveTime;
    }

    public void setLastActiveTime(Timestamp lastActiveTime) {
        this.lastActiveTime = lastActiveTime;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
