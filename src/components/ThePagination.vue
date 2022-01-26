<template>
  <div id="pagination-wrapper"></div>
</template>

<script>
export default {
  props: ["receivedPages"],
  data() {
    return {
      numOfPages: this.receivedPages,
      currentPage: 1,
      buttonsToShow: 5,
      buttonClicked: 1,
    };
  },
  methods: {
    displayButtons(buttonClicked) {
      let buttonsWrapper = document.getElementById("pagination-wrapper");
      buttonsWrapper.innerHTML = ``; // clear the buttons wrapper, on each call of the function

      // set the value of the left and right most page buttons
      let maxLeft = this.currentPage - Math.floor(this.buttonsToShow / 2);
      let maxRight = this.currentPage + Math.floor(this.buttonsToShow / 2);

      if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = this.buttonsToShow;
      }
      if (maxRight > this.numOfPages) {
        maxLeft = this.numOfPages - (this.buttonsToShow - 1);

        if (maxLeft < 1) {
          maxLeft = 1;
        }
        maxRight = this.numOfPages;
      }

      for (let page = maxLeft; page <= maxRight; page++) {
        if (page === buttonClicked) {
          buttonsWrapper.innerHTML += `<button value=${page} class="page page-btn active">${page}</button>`;
        } else {
          buttonsWrapper.innerHTML += `<button value=${page} class="page page-btn">${page}</button>`;
        }
      }

      // add the 'first' page button if the active button is greater than or equal to 4
      if (this.currentPage >= 4) {
        buttonsWrapper.innerHTML =
          `<button value=${1} class="page page-btn">&#171; First</button>` +
          buttonsWrapper.innerHTML;
      }

      // add the 'last' page button if the active button is less than or equal to the total number of pages minus 3
      if (this.currentPage <= this.numOfPages - 3) {
        buttonsWrapper.innerHTML += `<button value=${this.numOfPages} class="page page-btn">Last &#187;</button>`;
      }

      const pageBtns = document.querySelectorAll(".page");

      pageBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const buttonClicked = parseInt(this.value);
          console.log(buttonClicked);
          this.currentPage = buttonClicked;
        });
      });
    },
  },
  mounted() {
    this.numOfPages = this.receivedPages;
    // call the displayButtons() method when the component is mounted
    this.displayButtons();
  },
  updated() {
    this.numOfPages = this.receivedPages;
    // call the displayButtons() method every time the component is updated
    this.displayButtons();
  },
};
</script>