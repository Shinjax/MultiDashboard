import Stopwatch from './stopwatch';
import TaskList from './taskList';
import MoodTracker from './moodTracker';
import QuoteGenerator from './quoteGenerator';

const ProgressDashboard = () => {
  return (
    <section className="flex justify-between items-stretch h-[60vh] text-text mb-2.5">
      <div className="flex-1 bg-[#1b2330] p-4 mr-4 mt-4 rounded-lg">
        <h3 className="m-0 font-semibold">Timer</h3>
        <div className="flex flex-row justify-center mt-6">
          <Stopwatch />
        </div>
      </div>
      <TaskList />
      <MoodTracker />
      <QuoteGenerator />
    </section>
  );
};

export default ProgressDashboard;