import React from 'react'

import TaskList from '../task-list'
import Footer from '../footer'

const Main = ({
  onEdit,
  onDeleted,
  onToggleItems,
  onChangeLabel,
  countNotChecked,
  functionFilter,
  filteredTasks,
  clearCompleted,
  valueTab,
  timerstop,
  timerplay,
}) => {
  return (
    <section className="main">
      <TaskList
        onDeleted={onDeleted}
        onToggleItems={onToggleItems}
        filteredTasks={filteredTasks}
        timerstop={timerstop}
        timerplay={timerplay}
        onEdit={onEdit}
        onChangeLabel={onChangeLabel}
      />
      <Footer
        countNotChecked={countNotChecked}
        functionFilter={functionFilter}
        clearCompleted={clearCompleted}
        valueTab={valueTab}
      />
    </section>
  )
}
export default Main
