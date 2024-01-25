import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchAnswers() {
      //database related works
      const db = getDatabase();
      const answersRef = ref(db, "answers/" + videoID + "/questions");
      const answersQuery = query(answersRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        //request firebase database

        const snapshot = await get(answersQuery);
        setLoading(false);

        if (snapshot.exists()) {
          // setAnswers((prevAnswers) => {
          //   return [...prevAnswers, ...Object.values(snapshot.val())];
          // });
          setAnswers((prevAnswers) => {
            const newAnswers = Object.values(snapshot.val());

            // Use a Set to keep track of unique answers
            const uniqueAnswers = new Set(
              prevAnswers.map((answer) => answer.index)
            );

            // Filter out arrays with duplicate answers
            const filteredAnswers = newAnswers.filter(
              (answer) => !uniqueAnswers.has(answer.index)
            );

            // Concatenate the unique arrays with the previous answers
            return [...prevAnswers, ...filteredAnswers];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswers();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
