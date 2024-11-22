package com.example.koiorderingdeliverysystem.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.Join;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Users customer;

    private Date order_date;
    private String original_location;
    private String destination;
    private String transport_method;
    private String status;
    private double fish_weight;
    @Min(value = 1, message = "at least 1 fish")
    @Max(value = 10, message = "1 order maximum 10 fish")
    private int quantity;
    private double total;
    private Date paymentDeadline; // Thời gian thanh toán
    private boolean isPaid;


    @ManyToOne
    @JoinColumn(name = "approved_by")
    @JsonIgnore
    private Users approvedBy;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Users assignedTo;

    @OneToMany(mappedBy = "orders")
    private List<OrderServices> orderServices;


    @OneToMany(mappedBy = "order")
    private List<KoiFish> koiFish;



    private Integer warehouseId;
}
