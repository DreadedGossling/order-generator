<template>
  <button
    style="background-color: mediumaquamarine; color: #000; margin-bottom: 20px"
    @click="$router.push('/')"
  >
    ← Go Home
  </button>

  <div class="container" style="width: 350px">
    <div
      style="
        color: black;
        font-weight: bold;
        padding: 5px;
        padding-left: 20px;
        background-color: #e5e4e2;
      "
    >
      <span style="font-size: x-small; font-weight: 900">˂</span>
      <span style="font-size: 13px; margin-left: 6px">Your Orders</span>
    </div>
    <div class="card">
      <h3 style="color: black; margin-top: -6px; font-size: 14px;">Order Details</h3>

      <div v-if="isEditing" class="edit-section">
        <label>
          Order Date:
          <input v-model="formData.date" type="date" />
        </label>
        <label>
          Order Number:
          <input v-model="formData.orderNumber" type="text" />
        </label>
        <label>
          Product Name:
          <input v-model="formData.productName" type="text" />
        </label>
        <label>
          Seller:
          <input v-model="formData.seller" type="text" />
        </label>
        <label>
          Payment Method:
          <input v-model="formData.paymentMethod" type="text" />
        </label>
        <label>
          Price:
          <input v-model.number="formData.price" type="number" />
        </label>
        <label>
          Shipping Fee:
          <input v-model.number="formData.shipping" type="number" />
        </label>
        <label>
          Marketplace Fee:
          <input v-model.number="formData.marketplaceFee" type="number" />
        </label>
        <label>
          Ship To:
          <textarea v-model="formData.shipTo"></textarea>
        </label>
        <label>
          Upload Product Image:
          <input type="file" @change="onFileChange" />
        </label>

        <button @click="saveData">Save</button>
      </div>

      <div v-else class="view-section">
        <div class="order-box">
          <div style="margin-bottom: 4px;">
            <span style="color: #808080">Order placed:</span>
            <span style="margin-left: 30px">{{
              formatDate(formData.date)
            }}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: grey">Order number:</span>
            <span style="margin-left: 23px">{{ formData.orderNumber }}</span>
          </div>
          <hr
            style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0"
          />
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <span style="margin-left: 20px">Download Invoice</span>
            <span style="font-weight: bolder; margin-right: 10px">></span>
          </div>
          <hr
            style="border: none; border-top: 1px solid #d3d3d3; margin: 6px 0"
          />
        </div>

        <hr
          style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0"
        />

        <div class="product-card">
          <h4 style="font-weight: bold; margin-bottom: 5px; margin-top: -4px">
            Arriving Friday
          </h4>

          <div class="product-info">
            <img :src="formData.image || defaultImage" alt="Product" />
            <div>
              <p class="product-name">{{ formData.productName }}...</p>
              <p style="color: #808080; font-size: x-small; margin-top: -5px">
                Sold by:
                <span style="color: #0047ab">{{ formData.seller }}</span>
              </p>
              <p
                style="font-size: x-small; margin-bottom: 8px; margin-top: -5px"
              >
                ₹{{ formData.price.toFixed(2) }}
              </p>
            </div>
          </div>
          <div class="actions">
            <button>Track package</button>
            <button>Cancel items</button>
            <button>Write a product review</button>
          </div>
        </div>

        <hr
          style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0"
        />

        <h4
          style="
            color: black;
            margin-top: 10px;
            margin-bottom: -5px;
            font-weight: bold;
            font-size: 13px;
          "
        >
          Payment method
        </h4>
        <div class="payment-box">
          <p style="margin-top: -3px; margin-bottom: -3px">
            {{ formData.paymentMethod }}
          </p>
        </div>

        <hr
          style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0"
        />

        <h4
          style="
            color: black;
            margin-top: 10px;
            margin-bottom: -5px;
            font-weight: bold;
            font-size: 13px;
          "
        >
          Ship to
        </h4>
        <div class="ship-box">
          <div class="multiline">{{ formData.shipTo }}</div>
        </div>

        <hr
          style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0"
        />

        <h4
          style="
            color: black;
            margin-top: 10px;
            margin-bottom: -5px;
            font-weight: bold;
            font-size: 13px;
          "
        >
          Order Summary
        </h4>
        <div class="summary-box">
          <div class="bill-details">
            <span>Item(s) Subtotal</span>
            <span>₹{{ formData.price.toFixed(2) }}</span>
          </div>
          <div class="bill-details">
            <span>Shipping</span>
            <span>₹{{ formData.shipping.toFixed(2) }}</span>
          </div>
          <div class="bill-details">
            <span>Marketplace Fee</span>
            <span>₹{{ formData.marketplaceFee.toFixed(2) }}</span>
          </div>
          <div class="bill-details">
            <span>Total</span>
            <span>₹{{ total.toFixed(2) }}</span>
          </div>
          <div class="bill-details">
            <span class="grand">Grand Total:</span>
            <span class="grand">₹{{ total.toFixed(2) }}</span>
          </div>
        </div>

        <hr
          style="border: none; border-top: 1px solid #d3d3d3; margin: 7px 0;"
        />

        <button class="edit-btn" @click="isEditing = true">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const isEditing = ref(true);
const defaultImage = "bounvita.png"; // You uploaded this image

const formData = ref({
  date: "2025-11-04",
  orderNumber: "402-1992851-9613155",
  productName:
    "Bournvita Zero Added Sugar Nutrition Drink, 500g Jar | No Added Sugar",
  seller: "Amazon Retail",
  price: 282,
  paymentMethod: "Mastercard ending in 3703",
  shipping: 100,
  marketplaceFee: 5,
  shipTo:
    "Babu Verma\nMill A Sector-6\nBellary, Dhurwa\nRANCHI, JHARKHAND 818100\nIndia",
  image: "",
});

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      formData.value.image = ev.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const saveData = () => {
  isEditing.value = false;
};

const total = computed(() => {
  return (
    formData.value.price +
    formData.value.shipping +
    formData.value.marketplaceFee
  );
});

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-GB", options);
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background: #f7f7f7;
  padding: 20px;
}
.container {
  margin: 10 auto; /* centers horizontally */
  background: white; /* optional, helps visualize */
  padding: 0px; /* optional, some spacing inside */
  box-sizing: border-box;
}

.card {
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
.card h3 {
  margin-bottom: 6px;
  font-weight: 900;
}
.edit-section label {
  display: block;
  margin-bottom: 10px;
  color: black;
}
.edit-section input,
.edit-section textarea {
  width: 100%;
  margin-top: 4px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.edit-section button {
  margin-top: 10px;
  padding: 8px 12px;
  cursor: pointer;
}
.order-box,
.product-card,
.payment-box,
.ship-box,
.summary-box {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px;
  margin-top: 10px;
  color: black;
  font-size: 12px;
}
.multiline {
  white-space: pre-line;
  font-size: 12px;
}

.product-info {
  display: flex;
  gap: 10px;
}
.product-info img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 2px;
}
.product-name {
  font-weight: bold;
  font-size: 11px;
}
.actions button {
  margin-right: 2px;
  border: 1px solid #d3d3d3;
  border-radius: 50px;
  font-size: 10px;
  padding: 6px 6px;
  background-color: #ffffff;
  color: black;
}
.invoice-btn,
.edit-btn {
  margin-top: 60px;
  padding: 6px 12px;
  background: #ffd814;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.summary-box .bill-details {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 2px;
}
.grand {
  font-weight: bold;
}
</style>
