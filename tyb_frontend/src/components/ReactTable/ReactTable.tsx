/**
 * Libs
 */
import { useContext } from "react";
import {
    useTable,
    usePagination,
    useSortBy,
    TableOptions,
    TableState,
    PluginHook,
    Column, HeaderGroup, Cell
} from 'react-table';

/**
 * Locals
 */
import "./ReactTable.scss";
import {AppContext} from "../../AppContext";

/**
 * Types
 */
type ReactTableProps = {
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any;
} & (
    | {
          hasPagination: true;
          initialState: Partial<TableState> | undefined;
      }
    | {
          hasPagination: false;
          initialState?: Partial<TableState>;
      }
);

function manageSortingArrows(column: HeaderGroup) {

    if (column.isSorted){
        if (column.isSortedDesc){
            return <i className="bi bi-arrow-down arrowCustom"/>;
        }else{
            return <i className="bi bi-arrow-up arrowCustom"/>;
        }
    }else{
        return <i className="bi bi-arrow-down-up arrowCustom"/>;
    }
}

function getHeaderRow(headerGroup: HeaderGroup, props: ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: true; initialState: Partial<TableState> | undefined }) | ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: false; initialState?: Partial<TableState> })) {
    return <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) =>
            props.hasSorting === true ? (
                <th
                    className={`${
                        props.border
                            ? "ReactTable__border"
                            : ""
                    }`}
                    {...column.getHeaderProps(
                        column.getSortByToggleProps()
                    )}
                >
                    <div
                        className={
                            "TableClassic__thead_th-flex"
                        }
                    >
                        {column?.Header ? column.render("Header") : ""}
                        {/* If the header is empty, don't display sorting */}
                        {column.Header &&
                            !column.disableSortBy ? (
                            <>
                                <span>
                                    {manageSortingArrows(column)}
                                </span>
                            </>
                        ) : null}
                    </div>
                </th>
            ) : (
                <th
                    className={`${
                        props.border
                            ? "ReactTable__border"
                            : ""
                    }`}
                    {...column.getHeaderProps()}
                >
                    {column.render("Header")}
                </th>
            )
        )}
    </tr>;
}

function manageHooks(props: ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: true; initialState: Partial<TableState> | undefined }) | ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: false; initialState?: Partial<TableState> })) {
    const outputHooks: PluginHook<{}>[] = [];
    if (props.hasSorting === true) {
        outputHooks.push(useSortBy);
    }
    if (props.hasPagination === true) {
        outputHooks.push(usePagination);
    }
    if (props.tableHooks !== undefined) {
        outputHooks.push(props.tableHooks);
    }
    return outputHooks;
}

function getOptions(props: ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: true; initialState: Partial<TableState> | undefined }) | ({
    columns: Column[];
    data: any;
    displaysMissingDataError?: boolean;
    hasSorting?: boolean;
    tableHooks?: PluginHook<{}> | ((hooks: any) => void);
    border?: any
} & { hasPagination: false; initialState?: Partial<TableState> })) {
    const outputOptions: TableOptions<{}> = {
        columns: props.columns,
        data: props.data
    };
    if (props.initialState) {
        outputOptions.initialState = props.initialState;
    }
    return outputOptions;
}

function getTd<D>(props: any, cell: Cell) {
    return (
        <td
            className={`${
                props.border
                    ? "ReactTable__border p-1"
                    : "p-1"
            }`}
            {...cell.getCellProps()}
        >
            {cell.render("Cell")}
        </td>
    );
}

function getPageComponent(canPreviousPage: boolean, previousPage: () => void, pageIndex: number, canNextPage: boolean, nextPage: () => void) {
    return <>
        {canPreviousPage ? (
            <button onClick={() => previousPage()}>
                {pageIndex}
            </button>
        ) : null}
        <button className="ReactTable__pagination-PageIndices-CurrentIndex">
            {pageIndex + 1}
        </button>
        {canNextPage ? (
            <button onClick={() => nextPage()}>
                {pageIndex + 2}
            </button>
        ) : null}
    </>;
}

/**
 * @description A reusable component abstraction of a core react-table table instance.
 * The passed columns and data should be memoized values with the useMemo hook.
 *
 * @param {props} props the props of the component
 * @param {Column[]} props.columns MEMOIZED columns of the table
 * @param {any} props.data MEMOIZED data of the table
 * @param {boolean} props.hasSorting whether the table has sorting
 * @param {boolean} props.hasPagination whether the table has pagination
 * @param {Partial<TableState> | undefined} props.initialState the initial state of the table
 * @param {PluginHook<{}> | ((hooks: any) => void)} props.tableHooks the table hooks
 * @returns {JSX.Element}  the react-table component
 */
const ReactTable = (props: ReactTableProps) => {
    const { appText } = useContext(AppContext);

    /**
     * Add props table hooks to hook array and prepare for useTable hook parameter
     *
     * @returns table hooks array
     */
    const getPresentTableHooks = () => {
        return manageHooks(props);
    };

    /**
     * Prepare props table options for useTable hook parameter
     *
     * @returns table options
     */
    const getTableOptions = () => {
        return getOptions(props);
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        rows,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        columns
    } = useTable(
        {
            ...getTableOptions()
        },
        ...getPresentTableHooks()
    );

    const getRowOrPageMappable = () => {
        return props.hasPagination ? page : rows;
    };

    return (
        <div className="ReactTable__wrapper">
            <div className="ReactTable__tableWrapper">
                <table className="ReactTable__table" {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => getHeaderRow(headerGroup, props))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {(props.data === undefined ||
                            JSON.stringify(props.data) === "[]") &&
                        props.displaysMissingDataError !== false ? (
                            <tr>
                                <td
                                    colSpan={columns?.length}
                                    style={{ fontWeight: "normal" }}
                                >
                                    {"Non ci sono dati da mostrare"}
                                </td>
                            </tr>
                        ) : (
                            getRowOrPageMappable().map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return getTd(props, cell);
                                        })}
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {props.hasPagination && props.data?.length > 1 ? (
                <div className="ReactTable__pagination">
                    <div className="d-flex flex-row w-100 mt-2">
                        <div className="bootstrap-select-wrapper  justify-content-start mt-2 col-4">

                        </div>
                        <div className="d-flex justify-content-center col-4">
                            <div className="ReactTable__pagination-wrapper">
                                <button
                                    className="bi bi-chevron-left"
                                    onClick={() => previousPage()}
                                    disabled={!canPreviousPage}
                                ></button>
                                <div className="ReactTable__pagination-PageIndices">
                                    {getPageComponent(canPreviousPage, previousPage, pageIndex, canNextPage, nextPage)}
                                </div>
                                <button
                                    className="bi bi-chevron-right"
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                ></button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ReactTable;
