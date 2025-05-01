<template>
  <div class="page-container">
    <div class="content-container">

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowWhatIsClassifier">What is Classifier?</h3>
        <transition name="fade">
          <div v-if="showWhatIsClassifier" class="info-text">
            <span>“Classifier” is a tool designed to label a text.</span>
            <br>
            <span>You can input any message or quote, choose a category, and get back the result.</span>
            <div class="example-container">
              <table>
                <tr><td>detect: sentiment</td></tr>
                <tr>
                  <td>"OK I guess"</td>
                  <td>result: negative</td>
                </tr>
                <tr>
                  <td>"OK!"</td>
                  <td>result: positive</td>
                </tr>
              </table>
            </div>
          </div>
        </transition>
      </div>

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowHowDoesItWork">How Does it Work?</h3>
        <transition name="fade">
          <div v-if="showHowDoesItWork" class="info-text">
            <span>Using model MultinomialNB from <a href="https://scikit-learn.org/">scikit-learn</a>, the Classifier processes large datasets of texts and classifications to train on the data. </span>
            <br>
            <span>Once trained, it can predict the labels of new texts based on their match with the processed data matrix.</span>
            <br>
            <span>This model is based on a method called BoW (Bag of Words), which is commonly used to classify articles by topic, predict user reactions on social media, and filter spam in emails and messages.</span>
            <h4 class="secondary-heading">
              Step 1 - preprocessing the data
            </h4>
            <span>The data files are csv format, which usually contain text and labels:</span>

            <div class="example-container">
              <table class="wider-table">
                <tr><td class="top-cell">spam.csv</td></tr>
                <tr>
                  <th class="t-header">label</th>
                  <th class="t-header">text</th>
                </tr>
                <tr>
                  <td>spam</td>
                  <td>"WIN: We have a winner! Mr. T. Foley won an iPod! More exciting prizes soon, so keep an eye on ur mobile or visit www.win-82050.co.uk"</td>
                </tr>
                <tr>
                  <td>spam</td>
                  <td>"PRIVATE! Your 2003 Account Statement for 07753741225 shows 800 un-redeemed S. I. M. points…"</td>
                </tr>
                <tr>
                  <td>ham</td>
                  <td>"K I'll be there before 4"</td>
                </tr>
              </table>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showWhatIsClassifier: false,
      showHowDoesItWork: false,
    };
  },
  methods: {
    toggleShowWhatIsClassifier() {
      this.showWhatIsClassifier = !this.showWhatIsClassifier;
    },

    toggleShowHowDoesItWork() {
      this.showHowDoesItWork = !this.showHowDoesItWork;
    }
  },
};
</script>

<style scoped>
* {
  padding: 0.3vw;
}

.page-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.5);
  padding: 7rem;
  width: 80vw;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.18) 0 2px 4px;
}

span {
  display: inline-block;
  width: 100%;
}

a {
  padding: 0;
  margin: 0;
  color: #30737f;
  font-weight: 500;
}

.heading {
  font-size: 1.8rem;
  font-weight: 900;
  margin: 0.5rem;
  font-family: "Tourney", sans-serif;
  color: #3c6763;
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease;
}
.heading:hover {
  color: #2d4f4c;
}

.secondary-heading {
  font-size: 1.2rem;
  font-weight: 500;
  color: #142221;
  text-decoration: underline;
}

.info-text {
  font-size: 1rem;
  display: block;
  color: #333;
}

.example-container {
  margin-top: 1rem;
  font-weight: normal;
  padding: 1rem;
  background-color:rgb(1, 1, 1, 0.03);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.example-container * {
  font-weight: normal;
  font-size: 0.8rem;
  padding: 0.2rem;
  text-align: left;
  line-height: 1.4rem;
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
}

tr + tr {
  border-top: #a7c2be 1px solid;
}

.wider-table * {
  width: fit-content;
}

.top-cell {
  padding-bottom: 1rem;
}

.t-header {
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

@media (max-width: 800px) {
  .content-container {
    max-width: 90%;
    max-height: 100%;
    overflow-y: scroll;
    padding: 1rem;
  }
}

@media (max-width: 400px) {
  .content-container {
    padding: 0.5rem;
  }

  .heading {
    font-size: 2.5rem;
  }

  .info-text {
    font-size: 1rem;
  }
}

@media (max-height: 650px) {
  .content-container {
    padding: 1rem;
  }
}
</style>
