import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      //database related works
      const db = getDatabase();
      const quizRef = ref(db, "quiz/" + videoID + "/questions");
      const quizQuery = query(quizRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database

        const snapshot = await get(quizQuery);
        setLoading(false);

        if (snapshot.exists()) {
          // setQuestions((prevQuestions) => {
          //   return [...prevQuestions, ...Object.values(snapshot.val())];
          // });
          setQuestions((prevQuestions) => {
            const newQuestions = Object.values(snapshot.val());

            // Use a Set to keep track of unique questions
            const uniqueQuestions = new Set(
              prevQuestions.map((question) => question.index)
            );

            // Filter out arrays with duplicate questions
            const filteredQuestions = newQuestions.filter(
              (question) => !uniqueQuestions.has(question.index)
            );

            // Concatenate the unique arrays with the previous questions
            return [...prevQuestions, ...filteredQuestions];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchQuestions();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
