import FunctionButton from "../function-admin/FunctionButton";

function Sidebar() {
  const styleSidebar = {
    width: "345px",
    backgroundColor: "red",
  };

  return (
    <div style={styleSidebar}>
      <FunctionButton icon={"coffee"} text={"Thống kê"} />
    </div>
  );
}

export default Sidebar;
