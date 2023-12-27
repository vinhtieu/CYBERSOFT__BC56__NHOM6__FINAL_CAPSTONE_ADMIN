import { Dropdown, Typography, Button } from "antd";
import React, { useState } from "react";

export default function Menu({ title, menuItems, selectedItem, action }) {
  const DEFAULT_LABEL = "----Select----";
  const [label, setLabel] = useState(DEFAULT_LABEL);
  const items = [...menuItems];
  const handleClickItem = (e) => {
    items.forEach((item) => {
      if (item.key === e.key) {
        action(item, title);
        setLabel(item.label);
      }
    });
  };

  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        // defaultSelectedKeys: [`0`],
        onClick: handleClickItem,
      }}>
      <Typography.Link>
        <Button rootClassName={"min-w-[100px]"}>
          {selectedItem && label === DEFAULT_LABEL ? selectedItem : label}
        </Button>
      </Typography.Link>
    </Dropdown>
  );
}
