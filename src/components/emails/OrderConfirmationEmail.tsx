import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { formatPrice } from "@/lib/utils";

interface OrderConfirmationEmailProps {
  orderId: string;
  amount: number;
}

export const OrderConfirmationEmail = ({
  orderId,
  amount,
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Your Eqilo.fi Order #{orderId.substring(0, 6)} is confirmed!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you for your order!</Heading>
        <Text style={text}>
          We have received your order #{orderId} and are processing it now.
        </Text>
        <Section style={orderInfo}>
          <Text style={text}>
            <strong>Total Amount:</strong> {formatPrice(amount)} €
          </Text>
        </Section>
        <Text style={text}>
          If you have any questions, please reply to this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "32px",
  paddingBottom: "32px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
};

const orderInfo = {
  padding: "24px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  marginTop: "24px",
  marginBottom: "24px",
};