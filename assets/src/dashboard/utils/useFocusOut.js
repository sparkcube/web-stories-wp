/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useLayoutEffect } from 'react';

function useFocusOut(ref, callback, deps) {
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const onFocusOut = (evt) => {
      // If focus moves somewhere outside the node, callback time!
      if (evt.relatedTarget && !node.contains(evt.relatedTarget)) {
        callback();
      }
    };

    const onDocumentClick = (evt) => {
      // If something outside the target node is clicked, callback time!
      const isInDocument = node.ownerDocument.contains(evt.target);
      const isInNode = node.contains(evt.target);
      if (!isInNode && isInDocument) {
        callback();
      }
    };

    node.addEventListener('focusout', onFocusOut);
    node.ownerDocument.addEventListener('click', onDocumentClick);

    return () => {
      node.removeEventListener('focusout', onFocusOut);
      node.ownerDocument.removeEventListener('click', onDocumentClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps || []);
}

export default useFocusOut;
