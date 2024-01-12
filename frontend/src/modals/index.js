import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

export default (modalName) => modals[modalName];
