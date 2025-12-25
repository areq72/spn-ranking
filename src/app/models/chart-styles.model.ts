export interface ChartStyles {
  winsColor: string;
  lossesColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: number;
  tooltipBg: string;
}

export const winterChartStyles: ChartStyles = {
  winsColor: '#2fd066',
  lossesColor: '#e65050',
  textColor: '#fff',
  borderColor: '#F1D491FF',
  borderWidth: '0',
  borderRadius: 15,
  tooltipBg: 'rgb(28, 28, 28, 0.9)',
};

export const defaultChartStyles: ChartStyles = {
  winsColor: '#2fd066',
  lossesColor: '#e65050',
  textColor: '#fff',
  borderColor: '#f0c45a',
  borderWidth: '0',
  borderRadius: 15,
  tooltipBg: 'rgb(28, 28, 28, 0.9)',
};
