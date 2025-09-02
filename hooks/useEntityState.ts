import { useCallback, useState } from "react";

type Entity = Record<string, any>;

// Helper to get a nested value using dot notation
function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

// Helper to set a nested value using dot notation
function setByPath(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  let curr = obj;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    // If it's the last key, assign the value
    if (i === keys.length - 1) {
      curr[key] = value;
    } else {
      // Create an object if path doesn't exist or is not an object
      if (typeof curr[key] !== "object" || curr[key] === null) {
        curr[key] = {};
      }
      curr = curr[key];
    }
  }
}

// Main hook
export function useEntityState(initial?: Entity) {
  const [entity, setEntity] = useState<Entity>(initial || {});

  // Set value at path (triggers re-render)
  const set = useCallback(
    (path: string, value: any) => {
      const updated = JSON.parse(JSON.stringify(entity)); // Replaces structuredClone
      setByPath(updated, path, value);
      setEntity(updated);
    },
    [entity]
  );

  // Get value at path
  const get = useCallback(
    (path: string): any => {
      return getByPath(entity, path);
    },
    [entity]
  );

  return { entity, set, get };
}
