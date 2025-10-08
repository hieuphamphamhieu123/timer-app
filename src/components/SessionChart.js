// src/components/SessionChart.js
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../constants/config';
import { getLast7DaysData } from '../utils/chartUtils';

const screenWidth = Dimensions.get('window').width;

export default function SessionChart({ sessions }) {
  const { labels, data } = getLast7DaysData(sessions);

  // Nếu không có data, hiển thị message
  if (data.every(d => d === 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>📈 Thống kê 7 ngày</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Chưa có dữ liệu{'\n'}Hãy hoàn thành phiên đầu tiên!
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Số phiên 7 ngày gần nhất</Text>
      
      <LineChart
        data={{
          labels: labels,
          datasets: [{
            data: data,
            color: (opacity = 1) => COLORS.primary, // Màu line
            strokeWidth: 3, // Độ dày line
          }]
        }}
        width={screenWidth - 40} // Chiều rộng
        height={220} // Chiều cao
        chartConfig={{
          backgroundColor: COLORS.cardBackground,
          backgroundGradientFrom: COLORS.cardBackground,
          backgroundGradientTo: COLORS.cardBackground,
          decimalPlaces: 0, // Số thập phân
          color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
          labelColor: (opacity = 1) => COLORS.textSecondary,
          style: {
            borderRadius: 10,
          },
          propsForDots: {
            r: '6', // Kích thước dots
            strokeWidth: '2',
            stroke: COLORS.primary,
          },
          propsForBackgroundLines: {
            strokeWidth: 1,
            stroke: COLORS.border,
            strokeDasharray: '0', // Solid line
          },
        }}
        bezier // Smooth curve
        style={styles.chart}
        withInnerLines={true}
        withOuterLines={true}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={true}
      />

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {Math.max(...data)}
          </Text>
          <Text style={styles.summaryLabel}>Cao nhất</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {(data.reduce((a, b) => a + b, 0) / 7).toFixed(1)}
          </Text>
          <Text style={styles.summaryLabel}>TB/ngày</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {data.reduce((a, b) => a + b, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Tổng</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBackground,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  divider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  emptyContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 10,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});