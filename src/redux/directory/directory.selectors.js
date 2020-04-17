import { createSelector } from 'reselect'

const selectDirectory = (state) => state.directory;

export const selectDirectorySections = createSelector(
    [selectDirectory],
    (directory) => directory.sections
    //(anyname) => anyname.VALUE_DECLARED_IN_REDUCER
);