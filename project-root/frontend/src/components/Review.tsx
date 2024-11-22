import React from "react";
import { Typography, List, ListItem, ListItemText, Grid } from "@mui/material";

const products = [
  { name: "Product 1", desc: "Description 1", price: "$9.99" },
  { name: "Product 2", desc: "Description 2", price: "$3.45" },
];
const addresses = ["123 Main St", "Apartment 4B", "New York, NY, 10001"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr. John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const Review = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $13.44
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Shipping
          </Typography>
          {addresses.map((line, index) => (
            <Typography key={index} gutterBottom>
              {line}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
          {payments.map((payment) => (
            <Typography key={payment.name} gutterBottom>
              {payment.name}: {payment.detail}
            </Typography>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
