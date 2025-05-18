<template>
  <div class="page-container">
    <div class="content-container">

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowWhatIsClassifier">What is Classifier?</h3>
        <transition name="fade">
          <div v-if="showWhatIsClassifier" class="info-text">
            <p>Classifier is a text labeling tool that supports two categories, <strong>spam detection </strong>(spam vs not spam) and <strong>sentiment analysis</strong> (positive vs negative).<br>
              You can input any message or quote, choose a labeling category, and get back the result.<br><br>
              Here’s an example where it analyzed the sentiment of two messages:
            </p>
            <div class="example-container">
              <table>
                <tr><th>text</th><th>result</th></tr>
                <tr>
                  <td>"OK I guess"</td>
                  <td>negative </td>
                </tr>
                <tr>
                  <td>"OK!"</td>
                  <td>positive</td>
                </tr>
              </table>
            </div>
            <p>Labeling text by emotion can be valuable. For example, on social media platforms, companies post advertisements and users respond with comments.
              A classification tool can analyze these comments, identify the overall sentiment, and provide advertisers with data and insights into how their ads were received.</p>

          </div>
        </transition>
      </div>

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowHowDoesItWork">How Does it Work?</h3>
        <transition name="fade">
          <div v-if="showHowDoesItWork" class="info-text">
            <p>Using model MultinomialNB from <a href="https://scikit-learn.org/">scikit-learn</a>, classifier processes large datasets of texts and labels and then trains on the data. <br>
            Once trained, it can predict the labels of new texts based on their match with the processed data matrix.<br>

              This model is based on a method called <strong>BoW</strong> (Bag of Words),
              which is commonly used to classify articles by topic, predict user reactions on social media,
              and filter spam in emails and messages.
            </p>
            <h4 class="secondary-heading">
              Step 1 - preprocessing the data
            </h4>
            <p>The data we give the models comes in csv files, which usually contain texts and labels.<br>
            For example, here is a csv file with only 3 rows (most files have thousands) which is used to train the model for spam detection:
            </p>

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
            <p>To process the file, the model normalizes, tokenizes, and sometimes lemmatizes the text:</p>
            <ul class="bullet-point-list">
              <li><strong>Normalization: </strong>lowercase all text and remove punctuation.</li>
              <li><strong>Tokenization: </strong>split the text into individual words.</li>
              <li><strong>Lemmatization: </strong>reduce words to their base form.</li>
            </ul>
            <div class="example-container">
              <strong>This text: </strong><br>
                “WIN: We have a winner!” <br><br>
                <strong>Will be processed to: </strong><br>
                [“win”, “we”, “have”, “winner”]
            </div>
            <span class="new-row">
              Next, duplicates are removed, leaving a list of all the unique words from the data — the<strong> "Bag of Words"</strong>,
              also known as the<strong> vocabulary</strong>.
            </span>
            <div class="example-container">
              <p><strong>vocabulary from our example spam.csv file:</strong><br><br>
              ['account', 'before', 'eye', 'excite', 'foley', 'i', 'ipod', 'keep', 'k', 'mobile', 'mr', 'sim', 'point', 'prize', 'private', 'show', 'soon', 'statement', 'there', 'unredeemed', 'ur', 'visit', 'winner', 'win']</p>
            </div>
            <h4 class="secondary-heading">
              Step 2 - vectorization
            </h4>
            <p>Each row of text from the data file is converted into a vector.<br>
            The vector represents how often each word from the vocabulary appears in the text. <br>
            It has the same length as the vocabulary, and each position in the vector shows the count of the corresponding vocabulary word in the text.</p>
            <div class="example-container">
              <span>using our vocabulary, the text “I won an iPod” turned into this vector:</span>
              <span class="new-row">000001100000000000000001</span>
              <span class="new-row">it shows "1" where the words "I" "ipod" and "win" appear in the vocabulary. </span>
            </div>
            <p>At the end of this stage, all the vectors from the dataset are combined into a <strong>matrix</strong>.<br>
            Each column represents a unique word from the vocabulary, and each row represents a row of text from the data file.</p>
            <h4 class="secondary-heading">
              Step 3 - Training, Prediction, and Classification
            </h4>
            <p>To classify text, the model converts it into a vector. <br>
              It then runs calculations on the matrix to determine where the new vector fits best.</p>
            <div class="example-container">
              <span>this new vector fits best in the 4th row:</span>
              <img class="matrix-img" src="../../assets/images/matrix.png" alt="matrix">
            </div>
            <p>There are several factors that affect this calculation, such as:</p>
            <ul class="bullet-point-list">
              <li>accounting for the frequency of words in the data vs ignoring it.</li>
              <li>weighing the importance of certain words more heavily (for example, 'Free' in spam detection) versus treating all words equally.</li>
            </ul>
              <p>Eventually, the model provides an estimate of where the new text fits in the matrix.<br>
                It then looks at the corresponding row in the original data table to find the <strong>label</strong> that most likely describes the text.<br>
                <strong>Training</strong> the model means letting it classify sample texts, compare its classifications to the original labels, and adjust its parameters.<br>
                Once the model produces accurate results, it’s ready to classify completely new texts.</p>
          </div>
        </transition>
      </div>

      <div class="segment-container">
        <h3 class="heading" @click="toggleShowCommonQuestions">Common Questions & Answers</h3>
        <transition name="fade">
          <div v-if="showCommonQuestions" class="info-text">
            <h4 class="secondary-heading secondary-heading-fix">Why is there a delay in loading the website?</h4>
            <p>The vector matrix the model uses for classification is quite large.<br>
              Assuming a csv file of 5,000 labeled messages, there are about 5,000 unique words, resulting in a 5000x5000 matrix.<br>
              This requires some time in the backend to process and load.
            </p>
            <h4 class="secondary-heading" id="wrong-classification">Why did I get a wrong classification?</h4>
            <p>Any NLP (natural language processing) model is only as good as the data it was trained on.<br>
              Since this is an educational project, I used free csv files from <a href="https://www.kaggle.com/">Kaggle</a>
              to train the model.<br>
              These datasets work well for testing, but they aren't as large or diverse as those used by commercial models,
              so they don't cover all cases.
            </p>
            <h4 class="secondary-heading" id="wrong-classification">What else can classifier do?</h4>
            <p>This tool can be adapted for many types of labeling tasks - such as classifying topics or identifying political leanings, with just a new dataset and a small update to the backend.<br>
              It can also fit into a system as a step in a feedback pipeline for filtering spam or profanity, or tag content and products.<br>
              If this sounds useful for your work, feel free to reach out!
            </p>
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
  mounted() {
    const hash = this.$route.hash?.replace('#', '') || '';
    if (hash === 'wrong') {
      this.showCommonQuestions = true;

      this.$nextTick(() => {
        const el = document.getElementById('wrong-classification');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('highlight');
          setTimeout(() => el.classList.remove('highlight'), 3000);
        }
      });
    }
  }
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
  width: 70vw;
  min-height: 92vh;
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
  font-size: 1.4rem;
  font-weight: 500;
  color: #142221;
  text-decoration: underline;
  margin-top: 2rem;
}

.secondary-heading-fix {
  margin-top: 0;
}

.info-text {
  font-size: 1.2rem;
  display: block;
  color: #333;
}

.example-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: normal;
  font-size: 1rem;
  padding: 1rem;
  background-color:rgb(1, 1, 1, 0.03);
  box-shadow: rgba(50, 50, 93, 0.25) 0 2px 5px -1px, rgba(0, 0, 0, 0.3) 0 1px 3px -1px;
}

.example-container * {
  font-size: 1rem;
  text-align: left;
  line-height: 1.4rem;
  font-family: 'Segoe UI', 'Tahoma', 'Geneva', sans-serif;
}

tr + tr {
  border-top: #a7c2be 1px solid;
}

th {
  font-weight: 500;
}

td {
  padding-right: 1.5rem;
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

.highlight {
  background-color: rgba(0, 255, 234, 0.2);
  transition: background-color 1s ease-in-out;
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
