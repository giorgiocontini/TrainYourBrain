/**
 * Libs
 */
// @ts-ignore
import XLSX from "sheetjs-style";
// @ts-ignore
import * as FileSaver from "file-saver";
import {useEffect, useState} from "react";
import {Column} from "react-table";

/**
 * Locals
 */
import {TablesConfigExcel} from "./tablesConfigExcel";


/**
 * Types
 */
type ExcelProps = {
    columns: Column[];
    data: any;
    config?: TablesConfigExcel[];
    fileName: string;
    sheetName?: string;
    customStyle?: string;
    disabled?: boolean;
    title?: string;
};

/**
 * Button to export props react-table data to excel table file
 *
 * @param columns react-table columns array
 * @param data data objects array
 * @param fileName filename for the exported file
 * @param config configs array
 * @param customStyle styles css string
 * @param disabled
 * @returns JSX
 */
const ExportXLSXButton = ({
                              columns,
                              data,
                              fileName,
                              config,
                              customStyle,
                              disabled, title
                          }: ExcelProps) => {

    /**
     * Constant for filetype
     */
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

    /**
     * Constant for file extension
     */
    const fileExtension = ".xlsx";
    const [dataToPrint, setDataToPrint] = useState<any[]>([])
    const regexDate = new RegExp("([0-9]+(-[0-9]+)+)");

    /**
     *
     * @param columnsFiltered
     * @param accessor
     * @param newSingleData
     * @param d
     */
    function manageSimpleAccessor(columnsFiltered: Column[], accessor: string, newSingleData: any, d: any) {
        const column = columnsFiltered.find(
            (c) => c.accessor === accessor
        );
        if (column) {
            newSingleData[column.Header as keyof {}] =
                regexDate.test(d[accessor])
                    ? d[accessor].substring(0, 10)
                    : d[accessor]?.toString();
        }
    }

    /**
     *
     * @param accessor
     * @param d
     * @param columnsFiltered
     * @param newSingleData
     */
    function manageComplexAccessor(accessor: string, d: any, columnsFiltered: Column[], newSingleData: any) {
        const accessorElementArray = accessor.split(".");
        let accessorElement = d;
        accessorElementArray.forEach((el) => {
            accessorElement = accessorElement[el];
        });
        const column = columnsFiltered.find(
            (c) => c.accessor === accessor
        );
        if (column) {
            newSingleData[column.Header as keyof {}] =
                regexDate.test(accessorElement)
                    ? accessorElement.substring(0, 10)
                    : accessorElement?.toString();
        }
    }

    /**
     * ###########FOR PRINTING ONLY FIELDS IN TABLE VIEW ###########################
     */
    const filterDataForPrintNoConfig = () => {
        const accessors: string[] = [];
        columns.forEach((column) => {
            if (column.accessor && column.Header) {
                accessors.push(column.accessor.toString());
            }
        });
        const columnsFiltered = columns.filter(
            (column) => column.accessor && column.Header
        );

        const newData: any[] = data.map((d: any) => {
            const newSingleData: any = {};
            accessors.forEach((accessor) => {
                if (accessor.includes(".")) {
                    manageComplexAccessor(accessor, d, columnsFiltered, newSingleData);
                } else {
                    manageSimpleAccessor(columnsFiltered, accessor, newSingleData, d);
                }
            });
            return newSingleData;
        });

        setDataToPrint(newData);
    };

    /**
     * Filter data for print
     */
    const filterDataForPrint = () => {
        if (config) {
            const newData: any[] = data.map((row: any) => {
                const newSingleData: any = {};
                config.forEach((el) => {
                    newSingleData[el.header as keyof {}] =
                        el.getFieldValue(row);
                });
                return newSingleData;
            });

            setDataToPrint(newData);
        }
    };

    /**
     * Filter data on data update condtionally to config
     */
    useEffect(() => {
        if (config) {
            filterDataForPrint();
        } else {
            filterDataForPrintNoConfig();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    /**
     * Generate .xlsx
     */
    const exportToExcel = async () => {
        const wscols: any[] = [];
        Object.keys(dataToPrint[0]).forEach((el) => {
            wscols.push({wch: 20});
        });

        const ws = XLSX.utils.json_to_sheet(dataToPrint);
        Object.keys(ws).forEach((cell) => {
            if (cell !== "!ref") {
                ws[cell].s = {
                    alignment: {
                        vertical: "center",
                        horizontal: "center"
                    }
                };

                if (new RegExp("^[A-Z]1$").test(cell)) {
                    ws[cell].s = {
                        ...ws[cell].s,
                        font: {
                            bold: true
                        }
                    };
                }
            }
        });
        ws["!cols"] = wscols;

        const wb: any = {};
        wb.Sheets = {};
        wb.Sheets[fileName] = ws;
        wb.SheetNames = [fileName];

        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
        const blob = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(blob, fileName + fileExtension);
    };

    return (
        <div className={""}>
            <button
                className={
                    customStyle
                        ? customStyle + " btn btn-secondary me-auto"
                        : "btn btn-secondary me-auto"
                }
                onClick={(e) => !disabled && exportToExcel()}
                disabled={disabled}
            >
                <i className="bi bi-filetype-xlsx me-2"></i>
                {title ? title : "Esporta Excel"}
            </button>
        </div>

    );
};

export default ExportXLSXButton;
