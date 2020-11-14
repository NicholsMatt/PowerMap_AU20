package com.symp.polebackend.items;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Pole {

    @Id
    @GeneratedValue
    private long id;
    private float coords[];

    public Pole() {
        this.coords = new float[2];
    }


}
