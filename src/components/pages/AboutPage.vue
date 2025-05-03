<template>
  <div class="page-container">
    <div class="content-container">

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowWhatIsClassifier">What is Classifier?</h3>
        <transition name="fade">
          <div v-if="showWhatIsClassifier" class="info-text">
            <span>"Classifier" is a tool designed to label a text.</span>
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
            <span>
              This model is based on a method called <strong>BoW</strong> (Bag of Words),
              which is commonly used to classify articles by topic, predict user reactions on social media,
              and filter spam in emails and messages.
            </span>
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
            <span class="new-row">To process the file, the model normalizes, tokenizes, and sometimes lemmatizes the text:</span>
            <ul class="bullet-point-list">
              <li><strong>Normalization: </strong>lowercase all text and remove punctuation.</li>
              <li><strong>Tokenization: </strong>split the text into individual words.</li>
              <li><strong>Lemmatization: </strong>reduce words to their base form.</li>
            </ul>
            <div class="example-container">
              “WIN: We have a winner!” >> [“win”, “we”, “have”, “winner”]
            </div>
            <span class="new-row">
              Next, duplicates are removed, leaving a list of all the unique words from the data — the<strong> "Bag of Words"</strong>,
              also known as the<strong> vocabulary</strong>.
            </span>
            <div class="example-container">
              <span>vocabulary from our example spam.csv file:</span>
              <span class="new-row">['account', 'before', 'eye', 'excite', 'foley', 'i', 'ipod', 'keep', 'k', 'mobile', 'mr', 'sim', 'point', 'prize', 'private', 'show', 'soon', 'statement', 'there', 'unredeemed', 'ur', 'visit', 'winner', 'win']</span>
            </div>
            <h4 class="secondary-heading">
              Step 2 - vectorization
            </h4>
            <span>Each row of text from the data file is converted into a vector.</span>
            <span>The vector represents how often each word from the vocabulary appears in the text. </span>
            <span>It has the same length as the vocabulary, and each position in the vector shows the count of the corresponding vocabulary word in the text.</span>
            <div class="example-container">
              <span>using our vocabulary, the text “I won an iPod” turned into this vector:</span>
              <span class="new-row">000001100000000000000001</span>
              <span class="new-row">it shows "1" where the words "I" "ipod" and "win" appear in the vocabulary. </span>
            </div>
            <span>At the end of this stage, all the vectors from the dataset are combined into a <strong>matrix</strong>. </span>
            <span>Each column represents a unique word from the vocabulary, and each row represents a row of text from the data file.</span>
            <h4 class="secondary-heading">
              Step 3 - Training, Prediction, and Classification
            </h4>
            <span>To classify text, the model converts it into a vector. </span>
            <span> It then runs calculations on the matrix to determine where the new vector fits best.</span>
            <div class="example-container">
              <span>this new vector fits best in the 4th row:</span>
              <img class="matrix-img" src="../../assets/images/matrix.png">
            </div>
            <span>There are several factors that affect this calculation, such as:</span>
            <ul class="bullet-point-list">
              <li>accounting for the frequency of words in the data vs ignoring it.</li>
              <li>weighing the importance of certain words more heavily (for example, 'Free' in spam detection) versus treating all words equally.</li>
            </ul>
            <span>
              Eventually, the model provides an estimate of where the new text fits in the matrix.<br>
              It then looks at the corresponding row in the original data table to find the <strong>label</strong> that most likely describes the text.
            </span>
            <span>
              <strong>Training</strong> the model means letting it classify sample texts, compare its classifications to the original labels, and adjust its parameters.
            </span>
            <span>Once the model produces accurate results, it’s ready to classify completely new texts.</span>
          </div>
        </transition>
      </div>

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowCommonQuestions">Common Questions & Answers</h3>
        <transition name="fade">
          <div v-if="showCommonQuestions" class="info-text">
            <h4 class="secondary-heading secondary-heading-fix">Why is there a delay in loading the website?</h4>
            <span>The vector matrix the model uses for classification is quite large.
              Assuming a csv file of 5,000 labeled messages, there are about 5,000 unique words, resulting in a 5000x5000 matrix.
              This matrix requires substantial backend storage once processed.
            </span>
            <span>
              To manage storage space, only one classification type is loaded at a time, so switching categories may cause a short delay of 20–40 seconds.
            </span>
            <h4 class="secondary-heading">Why did I get a wrong classification?</h4>
            <span>Any NLP (natural language processing) model is only as good as the data it was trained on.</span>
            <span>
              Since this is a hobby project, I relied on free csv files from <a href="https://www.kaggle.com/">Kaggle</a>
              to train the model.
              These datasets work well for prototyping, but they aren't as large or diverse as those used by commercial models.
            </span>
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
      showCommonQuestions: false,
    };
  },
  methods: {
    toggleShowWhatIsClassifier() {
      this.showWhatIsClassifier = !this.showWhatIsClassifier;
    },

    toggleShowHowDoesItWork() {
      this.showHowDoesItWork = !this.showHowDoesItWork;
    },

    toggleShowCommonQuestions() {
      this.showCommonQuestions = !this.showCommonQuestions;
    }
  },
};
</script>

<style scoped>
* {
  padding: 0.3vw;
}

.page-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: left;
  flex-direction: column;
}

.content-container {
  background-color: rgba(210, 210, 210, 0.4);
  padding: 7rem;
  width: 80vw;
  min-height: 90vh;
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
  margin-top: 2rem;
}

.secondary-heading-fix {
  margin-top: 0;
}

.info-text {
  font-size: 1rem;
  display: block;
  color: #333;
}

.example-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: normal;
  font-size: 0.8rem;
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

.bullet-point-list {
  list-style-type: square;
  list-style-position: inside;
  padding-left: 1rem;
}

.new-row {
  margin-top: 0.5rem;
}

strong {
  font-weight: 600;
  margin: 0;
  padding: 0;
}

.matrix-img {
  max-height: 10rem;
  width: auto;
  border-radius: 0.5rem;
  opacity: 85%;
  z-index: 1;
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

@media (max-width: 900px) {
  .content-container {
    padding: 3rem;
  }
}

@media (max-width: 500px) {

  .heading {
    font-size: 1.2rem;
  }

  .secondary-heading {
    font-size: 1rem;
  }

  .content-container {
    margin-top: 2rem;
    padding: 0.5rem;
  }

  .info-text {
    font-size: 0.8rem;
  }
}

@media (max-height: 650px) {

}
</style>
