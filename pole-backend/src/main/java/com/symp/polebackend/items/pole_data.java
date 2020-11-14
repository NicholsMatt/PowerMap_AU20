package com.symp.polebackend.items;

import java.util.ArrayList;
import java.util.List;

public class pole_data {

    private double[] coordinates;
    private String last_maintenance_date;
    private List<String> pole_names;
    private String voltage;
    private int issue;

    public pole_data() {}

    public String getVoltage() {
        return voltage;
    }

    public void setVoltage(String voltage) {
        this.voltage = voltage;
    }

    public int getIssue() {
        return issue;
    }

    public void setIssue(int issue) {
        this.issue = issue;
    }

//    public pole_data(String last_maintenance_date, ArrayList<String> pole_names) {
//        this.coordinates = new double[2];
//        this.last_maintenance_date = last_maintenance_date;
//        this.pole_names = new ArrayList<>();
//    }

    public double[] getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(double[] coordinates) {
        this.coordinates = coordinates;
    }

    public String getLast_maintenance_date() {
        return last_maintenance_date;
    }

    public void setLast_maintenance_date(String last_maintenance_date) {
        this.last_maintenance_date = last_maintenance_date;
    }

    public List<String> getPole_names() {
        return pole_names;
    }

    public void setPole_names(List<String> pole_names) {
        this.pole_names = pole_names;
    }
}
