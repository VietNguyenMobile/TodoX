import React from "react";

const Footer = ({ completedTasksCount = 2 , activeTasksCount = 3 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          © 2024 TodoX. All rights reserved.
          <p className="text-sm text-muted-foreground mt-1">
            {completedTasksCount > 0 && (
              <>
                Great! You have completed {completedTasksCount} task
                {completedTasksCount > 1 ? "s" : ""}
                {activeTasksCount > 0 &&
                  `, remaining ${activeTasksCount} active task${
                    activeTasksCount > 1 ? "s" : ""
                  }. Keep going!`}
              </>
            )}

            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>
                You have {activeTasksCount} active task
                {activeTasksCount > 1 ? "s" : ""}. Keep going!
              </>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
