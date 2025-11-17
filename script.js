document.getElementById("inquiryForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = {};
  formData.name = document.querySelector("input[name='name']").value.trim();
  formData.contact = document
    .querySelector("input[name='contact']")
    .value.trim()
    .replace(/\D/g, "");
  formData.email =
    document.querySelector("input[name='email']").value.trim() ||
    "noemail@greenwich.com";
  formData.occupation = document
    .querySelector("input[placeholder='Enter occupation']")
    .value.trim();
  formData.company = document
    .querySelector("input[placeholder='Company name']")
    .value.trim();
  formData.address = document
    .querySelector("input[placeholder='Street, City, ZIP']")
    .value.trim();
  // Size checkboxes
  formData.sizes = [];
  if (document.getElementById("size1").checked)
    formData.sizes.push("4 BHK + HT");
  if (document.getElementById("size2").checked)
    formData.sizes.push("6 BHK + HT");
  // Price
  formData.min_price = document
    .querySelector("input[name='min_price']")
    .value.trim();
  formData.max_price = document
    .querySelector("input[name='max_price']")
    .value.trim();
  // HOW DID YOU KNOW — checkboxes
  let sourceList = [];
  document.querySelectorAll(".option-card input:checked").forEach((cb) => {
    sourceList.push(cb.parentElement.innerText.trim());
  });
  formData.source_list = sourceList.join(", ");
  // Remarks
  formData.remarks = document.querySelector("textarea").value.trim();
  fetch("crm.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        new bootstrap.Modal(document.getElementById("thankYouModal")).show();
        document.getElementById("inquiryForm").reset();
      } else {
        alert("CRM Error: " + data.error);
      }
    })
    .catch((err) => console.error("Request Error:", err));
});
