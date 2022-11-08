import { columnLabels } from "../questions";
import { useAnchorsTest } from "./AnchorsTest";

export const TestResult = () => {
  const { prevStep, testResult } = useAnchorsTest();

  function renderColumn(columnId: string, index: number) {
    return <th key={columnId}>{columnId}</th>;
  }

  function renderColumnRows(columnId: string, index: number) {
    const columnResult = testResult[columnId];
    return (
      <td key={columnId}>
        <table
          style={{
            minWidth: "200px"
          }}
        >
          <caption>{columnLabels[columnId]}</caption>
          {columnResult.questions.map((question) => (
            <tr key={`${columnId}-${question.id}`}>
              <th>{question.id}</th>
              <td>{question.answer}</td>
            </tr>
          ))}
          <tr>
            <th>Média</th>
            <td>{columnResult.result}</td>
          </tr>
        </table>
      </td>
    );
  }

  return (
    <fieldset>
      <legend>Resultados</legend>

      <table>
        <thead>{Object.keys(testResult).map(renderColumn)}</thead>
        <tbody>
          <tr>{Object.keys(testResult).map(renderColumnRows)}</tr>
        </tbody>
      </table>

      <button onClick={prevStep}>Voltar</button>
    </fieldset>
  );
};
