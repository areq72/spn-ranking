import { Component, computed, inject, input, Signal } from '@angular/core';
import { RankHistory } from '../../../models/player-detail.model';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { TranslateService } from '@ngx-translate/core';
import { formatRankLabel, getQueueScore, scoreToRank } from '../../../utils/tier-utils';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-rank-history-chart',
  imports: [NgxEchartsDirective],
  templateUrl: './rank-history-chart.html',
  styleUrl: './rank-history-chart.css',
})
export class RankHistoryChart {
  private readonly translate = inject(TranslateService);
  private readonly themeService = inject(ThemeService);

  readonly rankHistory = input<RankHistory[]>([]);

  private readonly soloScores = computed(() =>
    this.rankHistory().map((h) => getQueueScore(h.soloQ)),
  );

  private readonly flexScores = computed(() =>
    this.rankHistory().map((h) => getQueueScore(h.flexQ)),
  );

  private readonly xLabels = computed(() => this.rankHistory().map((h) => this.formatDate(h.date)));

  private readonly yMinMax = computed(() => {
    const values = [...this.soloScores(), ...this.flexScores()].filter((v) => Number.isFinite(v));

    if (values.length === 0) return { min: 0, max: 1000 };

    const min = Math.min(...values);
    const max = Math.max(...values);

    const pad = 120;
    return {
      min: Math.floor((min - pad) / 100) * 100,
      max: Math.ceil((max + pad) / 100) * 100,
    };
  });

  chartOptions: Signal<EChartsOption> = computed((): EChartsOption => {
    const yBounds = this.yMinMax();
    const x = this.xLabels();

    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        textStyle: {
          color: this.themeService.chartStyles()?.textColor,
        },
        backgroundColor: this.themeService.chartStyles()?.tooltipBg,
        formatter: (params: unknown) => {
          const items = Array.isArray(params) ? params : [];

          return items
            .map((item) => {
              const score = typeof item.data === 'number' ? item.data : 0;
              const { tier, rank, lp } = scoreToRank(score);
              return `${item.marker} ${item.seriesName}: ${this.translate.instant(`leagues.${tier}`)} ${rank} ${lp} LP`;
            })
            .join('<br/>');
        },
      },
      legend: {
        show: true,
        textStyle: {
          color: this.themeService.chartStyles()?.textColor,
          fontSize: '14px'
        },
        icon: 'circle'
      },
      grid: { left: 64, right: 18, top: 18 },
      xAxis: {
        type: 'category',
        data: x,
        axisLabel: {
          rotate: 45,
          margin: 10,
          color: this.themeService.chartStyles()?.textColor,
        },
        axisLine: {
          lineStyle: {
            color: this.themeService.chartStyles()?.textColor,
          },
        },
      },
      yAxis: {
        type: 'value',
        min: yBounds.min,
        max: yBounds.max,
        splitLine: { show: true },
        axisLabel: {
          color: this.themeService.chartStyles()?.textColor,
          fontSize: '14px',
          formatter: (value: number) => {
            if (!Number.isFinite(value)) return '';
            if (value % 100 !== 0) return '';

            const { tier, rank } = scoreToRank(value);
            if (tier === 'UNKNOWN' || rank === 'UNKNOWN') return '';
            return formatRankLabel(this.translate.instant(`leagues.${tier}`), rank);
          },
        },
      },
      series: [
        {
          type: 'line',
          smooth: true,
          symbolSize: 3,
          data: this.soloScores(),
          name: this.translate.instant('queues.soloQ'),
        },
        {
          type: 'line',
          smooth: true,
          symbolSize: 3,
          data: this.flexScores(),
          name: this.translate.instant('queues.flexQ'),
        },
      ],
    };
  });

  private formatDate(d: Date): string {
    const date = new Date(d);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    return `${dd}/${mm}`;
  }
}
