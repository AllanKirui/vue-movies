<template>
  <div id="pagination-wrapper"></div>
</template>

<script>
export default {
  name: "ThePagination",
  props: ["receivedPages", "chosenPage"],
  emits: ["switch-page"],
  data() {
    return {
      numOfPages: this.receivedPages,
      buttonsToShow: 5,
      // buttonClicked: "null",
    };
  },
  methods: {
    displayButtons(btn) {
      const that = this;

      let buttonsWrapper = document.getElementById("pagination-wrapper");
      buttonsWrapper.innerHTML = ``; // clear the buttons wrapper, on each call of the function

      // set the value of the left and right most page buttons
      let maxLeft = this.chosenPage - Math.floor(this.buttonsToShow / 2);
      let maxRight = this.chosenPage + Math.floor(this.buttonsToShow / 2);

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

      // loop through the range of buttons setting the active class on the clicked button
      for (let page = maxLeft; page <= maxRight; page++) {
        if (page === btn) {
          buttonsWrapper.innerHTML += `<button value=${page} title="page ${page}" class="page page-btn active">${page}</button>`;
        } else {
          buttonsWrapper.innerHTML += `<button value=${page} title="page ${page}" class="page page-btn">${page}</button>`;
        }
      }

      // add the 'first' page button if the active button is greater than or equal to 4
      if (this.chosenPage >= 4) {
        buttonsWrapper.innerHTML =
          `<button value=${1} title="page ${1}" class="page page-btn">&#171;</button>` +
          buttonsWrapper.innerHTML;
      }

      // add the 'last' page button if the active button is less than or equal to the total number of pages minus 3
      if (this.chosenPage <= this.numOfPages - 3) {
        buttonsWrapper.innerHTML += `<button value=${this.numOfPages} title="page ${this.numOfPages}" class="page page-btn">&#187;</button>`;
      }

      // listen for click events on the page buttnons
      const pageBtns = document.querySelectorAll(".page");
      pageBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const buttonValue = parseInt(this.value);
          // emit the value of the button was clicked
          that.$emit("switch-page", buttonValue);
        });
      });
    },
  },
  mounted() {
    this.numOfPages = this.receivedPages;
    // call the displayButtons() method when the component is mounted
    this.displayButtons(this.chosenPage);
  },
  updated() {
    // get the total number of pages after every new search in ExpandedSearch.vue
    this.numOfPages = this.receivedPages;
  },
};
</script>