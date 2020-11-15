package com.symp.polebackend.items;


public class Pole {

    private long id;
    private pole_data pole_data;

    public Pole() {}

    public Pole(long id, pole_data pole_data) {
        this.id = id;
        this.pole_data = pole_data;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public pole_data getPole_data() {
        return pole_data;
    }

    public void setPole_data(pole_data pole_data) {
        this.pole_data = pole_data;
    }
}
