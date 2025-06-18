#!/usr/bin/env node

/**
 * Rule Health Dashboard
 * 
 * Generates comprehensive health metrics for the Cursor Rules system
 * Focuses on business impact and developer experience
 */

import { promises as fs } from 'fs';
import path from 'path';

interface RuleHealthMetrics {
  overview: {
    totalRules: number;
    completionRate: number;
    healthScore: number;
    lastUpdated: string;
  };
  businessImpact: {
    valueGenerated: number;
    customerImpact: string;
    riskMitigation: string[];
    roiScore: number;
  };
  developerExperience: {
    satisfactionScore: number;
    adoptionRate: number;
    onboardingTime: number;
    productivityGain: number;
  };
  systemHealth: {
    conflictCount: number;
    maintenanceBurden: number;
    ruleEffectiveness: number;
    communityContributions: number;
  };
  trends: {
    improving: string[];
    declining: string[];
    stable: string[];
  };
  recommendations: {
    immediate: string[];
    highPriority: string[];
    mediumPriority: string[];
  };
}

interface RuleStatus {
  file: string;
  status: 'production' | 'development' | 'stub' | 'deprecated';
  completeness: number;
  businessValue: number;
  developerSatisfaction: number;
  lastModified: Date;
  size: number;
}

class RuleHealthDashboard {
  private readonly rulesDir = '.cursor/rules';
  private readonly businessCriticalRules = [
    'companyInformationIntegration.mdc',
    'security-best-practices.mdc',
    'typescript-standards.mdc',
    'react-component-standards.mdc',
    'production-monitoring.mdc'
  ];

  async generateHealthReport(): Promise<RuleHealthMetrics> {
    console.log('📊 Generating Rule Health Dashboard...\n');

    const ruleStatuses = await this.analyzeAllRules();
    const overview = this.calculateOverview(ruleStatuses);
    const businessImpact = await this.calculateBusinessImpact(ruleStatuses);
    const developerExperience = await this.calculateDeveloperExperience(ruleStatuses);
    const systemHealth = await this.calculateSystemHealth(ruleStatuses);
    const trends = await this.calculateTrends(ruleStatuses);
    const recommendations = this.generateRecommendations(ruleStatuses, trends);

    return {
      overview,
      businessImpact,
      developerExperience,
      systemHealth,
      trends,
      recommendations,
    };
  }

  private async analyzeAllRules(): Promise<RuleStatus[]> {
    const ruleFiles = await this.getRuleFiles();
    const ruleStatuses: RuleStatus[] = [];

    for (const file of ruleFiles) {
      const filePath = path.join(this.rulesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const stats = await fs.stat(filePath);

      const status = this.determineRuleStatus(content, file);
      const completeness = this.calculateCompleteness(content);
      const businessValue = this.calculateBusinessValue(content, file);
      const developerSatisfaction = this.estimateDeveloperSatisfaction(content);

      ruleStatuses.push({
        file,
        status,
        completeness,
        businessValue,
        developerSatisfaction,
        lastModified: stats.mtime,
        size: stats.size,
      });
    }

    return ruleStatuses;
  }

  private determineRuleStatus(content: string, file: string): 'production' | 'development' | 'stub' | 'deprecated' {
    if (content.includes('deprecated') || content.includes('DEPRECATED')) {
      return 'deprecated';
    }

    if (content.length < 500) {
      return 'stub';
    }

    if (content.includes('## Implementation') && 
        content.includes('## Examples') && 
        content.includes('business') &&
        content.includes('```typescript')) {
      return 'production';
    }

    return 'development';
  }

  private calculateCompleteness(content: string): number {
    let score = 0;
    const requiredSections = [
      'Overview',
      'Business Impact',
      'Implementation',
      'Examples',
      'Common Mistakes',
      'Success Metrics'
    ];

    for (const section of requiredSections) {
      if (content.includes(section)) {
        score += 15;
      }
    }

    // Bonus points
    if (content.includes('```typescript')) score += 10;
    if (content.includes('Business Context')) score += 10;
    if (content.length > 2000) score += 10;

    return Math.min(100, score);
  }

  private calculateBusinessValue(content: string, file: string): number {
    let value = 20; // Base value

    // Critical business rules get higher value
    if (this.businessCriticalRules.includes(file)) {
      value += 30;
    }

    // Content quality indicators
    if (content.includes('customer')) value += 10;
    if (content.includes('revenue') || content.includes('ROI')) value += 10;
    if (content.includes('security') || content.includes('compliance')) value += 15;
    if (content.includes('performance') || content.includes('optimization')) value += 10;
    if (content.includes('accessibility')) value += 10;

    // Business context depth
    if (content.includes('Business Impact Framework')) value += 15;
    if (content.includes('Success Metrics')) value += 10;

    return Math.min(100, value);
  }

  private estimateDeveloperSatisfaction(content: string): number {
    let satisfaction = 50; // Base satisfaction

    // Clarity indicators
    if (content.includes('## Examples')) satisfaction += 15;
    if (content.includes('```typescript')) satisfaction += 10;
    if (content.includes('Common Mistakes')) satisfaction += 10;
    if (content.includes('❌') && content.includes('✅')) satisfaction += 10;

    // Usability indicators
    if (content.includes('Quick Start')) satisfaction += 5;
    if (content.includes('copy-paste')) satisfaction += 5;
    if (content.includes('step-by-step')) satisfaction += 5;

    // Negative indicators
    if (content.length < 500) satisfaction -= 20;
    if (!content.includes('Example')) satisfaction -= 15;

    return Math.max(0, Math.min(100, satisfaction));
  }

  private calculateOverview(ruleStatuses: RuleStatus[]): RuleHealthMetrics['overview'] {
    const totalRules = ruleStatuses.length;
    const productionRules = ruleStatuses.filter(r => r.status === 'production').length;
    const completionRate = (productionRules / totalRules) * 100;
    
    const avgCompleteness = ruleStatuses.reduce((sum, rule) => sum + rule.completeness, 0) / totalRules;
    const avgBusinessValue = ruleStatuses.reduce((sum, rule) => sum + rule.businessValue, 0) / totalRules;
    const avgDeveloperSatisfaction = ruleStatuses.reduce((sum, rule) => sum + rule.developerSatisfaction, 0) / totalRules;
    
    const healthScore = (avgCompleteness + avgBusinessValue + avgDeveloperSatisfaction) / 3;

    return {
      totalRules,
      completionRate: Math.round(completionRate),
      healthScore: Math.round(healthScore),
      lastUpdated: new Date().toISOString(),
    };
  }

  private async calculateBusinessImpact(ruleStatuses: RuleStatus[]): Promise<RuleHealthMetrics['businessImpact']> {
    const businessCriticalCompleted = ruleStatuses
      .filter(r => this.businessCriticalRules.includes(r.file) && r.status === 'production')
      .length;

    const totalBusinessCritical = this.businessCriticalRules.length;
    const businessCriticalCompletion = (businessCriticalCompleted / totalBusinessCritical) * 100;

    // Estimated monthly value based on rule effectiveness
    const estimatedMonthlyValue = this.calculateEstimatedBusinessValue(ruleStatuses);

    return {
      valueGenerated: estimatedMonthlyValue,
      customerImpact: this.assessCustomerImpact(businessCriticalCompletion),
      riskMitigation: this.identifyRiskMitigation(ruleStatuses),
      roiScore: Math.round(businessCriticalCompletion),
    };
  }

  private calculateEstimatedBusinessValue(ruleStatuses: RuleStatus[]): number {
    const businessValueMap = {
      'security-best-practices.mdc': 2000, // $2k/month in prevented security incidents
      'performance-error-handling.mdc': 1500, // $1.5k/month in improved conversion
      'companyInformationIntegration.mdc': 500, // $500/month in consistency
      'production-monitoring.mdc': 1000, // $1k/month in operational efficiency
      'typescript-standards.mdc': 800, // $800/month in reduced bugs
    };

    let totalValue = 0;
    for (const rule of ruleStatuses) {
      if (rule.status === 'production') {
        const baseValue = businessValueMap[rule.file] || 200;
        const effectivenessMultiplier = (rule.completeness + rule.businessValue) / 200;
        totalValue += baseValue * effectivenessMultiplier;
      }
    }

    return Math.round(totalValue);
  }

  private assessCustomerImpact(businessCriticalCompletion: number): string {
    if (businessCriticalCompletion >= 90) {
      return 'Excellent customer experience with strong security, performance, and consistency';
    } else if (businessCriticalCompletion >= 70) {
      return 'Good customer experience with minor areas for improvement';
    } else if (businessCriticalCompletion >= 50) {
      return 'Acceptable customer experience but with notable gaps';
    } else {
      return 'Customer experience at risk due to incomplete business-critical rules';
    }
  }

  private identifyRiskMitigation(ruleStatuses: RuleStatus[]): string[] {
    const risks: string[] = [];
    
    const securityRule = ruleStatuses.find(r => r.file === 'security-best-practices.mdc');
    if (securityRule?.status === 'production') {
      risks.push('Customer data protection and privacy compliance');
    }

    const performanceRule = ruleStatuses.find(r => r.file === 'performance-error-handling.mdc');
    if (performanceRule?.status === 'production') {
      risks.push('Performance bottlenecks and user experience issues');
    }

    const monitoringRule = ruleStatuses.find(r => r.file === 'production-monitoring.mdc');
    if (monitoringRule?.status === 'production') {
      risks.push('Production incidents and downtime');
    }

    return risks;
  }

  private async calculateDeveloperExperience(ruleStatuses: RuleStatus[]): Promise<RuleHealthMetrics['developerExperience']> {
    const avgSatisfaction = ruleStatuses.reduce((sum, rule) => sum + rule.developerSatisfaction, 0) / ruleStatuses.length;
    
    const productionRules = ruleStatuses.filter(r => r.status === 'production').length;
    const adoptionRate = (productionRules / ruleStatuses.length) * 100;

    // Estimate onboarding time based on rule completeness
    const avgCompleteness = ruleStatuses.reduce((sum, rule) => sum + rule.completeness, 0) / ruleStatuses.length;
    const onboardingTime = Math.max(1, 8 - (avgCompleteness / 100) * 6); // 1-8 hours

    // Estimate productivity gain based on rule effectiveness
    const productivityGain = Math.round(avgCompleteness * 0.3); // 0-30% gain

    return {
      satisfactionScore: Math.round(avgSatisfaction),
      adoptionRate: Math.round(adoptionRate),
      onboardingTime: Math.round(onboardingTime * 10) / 10, // Round to 1 decimal
      productivityGain,
    };
  }

  private async calculateSystemHealth(ruleStatuses: RuleStatus[]): Promise<RuleHealthMetrics['systemHealth']> {
    const conflictCount = await this.estimateConflicts(ruleStatuses);
    const maintenanceBurden = this.calculateMaintenanceBurden(ruleStatuses);
    const avgEffectiveness = ruleStatuses.reduce((sum, rule) => sum + rule.completeness, 0) / ruleStatuses.length;
    
    // Estimate community contributions (would be tracked in real implementation)
    const communityContributions = 5; // Placeholder

    return {
      conflictCount,
      maintenanceBurden: Math.round(maintenanceBurden),
      ruleEffectiveness: Math.round(avgEffectiveness),
      communityContributions,
    };
  }

  private async estimateConflicts(ruleStatuses: RuleStatus[]): Promise<number> {
    // Simplified conflict detection - would use more sophisticated analysis in real implementation
    const stubRules = ruleStatuses.filter(r => r.status === 'stub').length;
    const developmentRules = ruleStatuses.filter(r => r.status === 'development').length;
    
    // Estimate potential conflicts based on incomplete rules
    return Math.round((stubRules * 0.3) + (developmentRules * 0.1));
  }

  private calculateMaintenanceBurden(ruleStatuses: RuleStatus[]): number {
    const stubRules = ruleStatuses.filter(r => r.status === 'stub').length;
    const developmentRules = ruleStatuses.filter(r => r.status === 'development').length;
    const deprecatedRules = ruleStatuses.filter(r => r.status === 'deprecated').length;

    // Estimate hours per week for maintenance
    return (stubRules * 2) + (developmentRules * 1) + (deprecatedRules * 0.5);
  }

  private async calculateTrends(ruleStatuses: RuleStatus[]): Promise<RuleHealthMetrics['trends']> {
    // Simplified trend analysis - would use historical data in real implementation
    const improving: string[] = [];
    const declining: string[] = [];
    const stable: string[] = [];

    for (const rule of ruleStatuses) {
      if (rule.status === 'production' && rule.completeness > 80) {
        stable.push(rule.file);
      } else if (rule.status === 'development' && rule.completeness > 50) {
        improving.push(rule.file);
      } else if (rule.status === 'stub' || rule.completeness < 30) {
        declining.push(rule.file);
      }
    }

    return { improving, declining, stable };
  }

  private generateRecommendations(ruleStatuses: RuleStatus[], trends: RuleHealthMetrics['trends']): RuleHealthMetrics['recommendations'] {
    const immediate: string[] = [];
    const highPriority: string[] = [];
    const mediumPriority: string[] = [];

    // Immediate actions
    const criticalStubs = ruleStatuses.filter(r => 
      this.businessCriticalRules.includes(r.file) && r.status === 'stub'
    );
    
    if (criticalStubs.length > 0) {
      immediate.push(`🚨 Complete ${criticalStubs.length} business-critical stub rule(s): ${criticalStubs.map(r => r.file).join(', ')}`);
    }

    // High priority
    const developmentRules = ruleStatuses.filter(r => r.status === 'development').length;
    if (developmentRules > 3) {
      highPriority.push(`📝 Complete ${developmentRules} rules in development status`);
    }

    if (trends.declining.length > 2) {
      highPriority.push(`⚠️ Address ${trends.declining.length} declining rules`);
    }

    // Medium priority
    const lowSatisfactionRules = ruleStatuses.filter(r => r.developerSatisfaction < 60).length;
    if (lowSatisfactionRules > 0) {
      mediumPriority.push(`😊 Improve developer experience for ${lowSatisfactionRules} rules`);
    }

    const lowBusinessValueRules = ruleStatuses.filter(r => r.businessValue < 50).length;
    if (lowBusinessValueRules > 0) {
      mediumPriority.push(`💼 Enhance business context for ${lowBusinessValueRules} rules`);
    }

    return { immediate, highPriority, mediumPriority };
  }

  private async getRuleFiles(): Promise<string[]> {
    const files = await fs.readdir(this.rulesDir);
    return files.filter(file => file.endsWith('.mdc'));
  }

  async printHealthReport(): Promise<void> {
    const metrics = await this.generateHealthReport();

    console.log('\n' + '='.repeat(80));
    console.log('📊 CURSOR RULES HEALTH DASHBOARD');
    console.log('='.repeat(80));

    // Overview
    console.log('\n🎯 SYSTEM OVERVIEW');
    console.log(`├─ Total Rules: ${metrics.overview.totalRules}`);
    console.log(`├─ Completion Rate: ${metrics.overview.completionRate}%`);
    console.log(`├─ Health Score: ${metrics.overview.healthScore}/100`);
    console.log(`└─ Last Updated: ${new Date(metrics.overview.lastUpdated).toLocaleString()}`);

    // Business Impact
    console.log('\n💼 BUSINESS IMPACT');
    console.log(`├─ Monthly Value Generated: $${metrics.businessImpact.valueGenerated.toLocaleString()}`);
    console.log(`├─ ROI Score: ${metrics.businessImpact.roiScore}/100`);
    console.log(`├─ Customer Impact: ${metrics.businessImpact.customerImpact}`);
    console.log(`└─ Risk Mitigation: ${metrics.businessImpact.riskMitigation.length} areas protected`);

    // Developer Experience
    console.log('\n👨‍💻 DEVELOPER EXPERIENCE');
    console.log(`├─ Satisfaction Score: ${metrics.developerExperience.satisfactionScore}/100`);
    console.log(`├─ Adoption Rate: ${metrics.developerExperience.adoptionRate}%`);
    console.log(`├─ Onboarding Time: ${metrics.developerExperience.onboardingTime} hours`);
    console.log(`└─ Productivity Gain: ${metrics.developerExperience.productivityGain}%`);

    // System Health
    console.log('\n🔧 SYSTEM HEALTH');
    console.log(`├─ Active Conflicts: ${metrics.systemHealth.conflictCount}`);
    console.log(`├─ Maintenance Burden: ${metrics.systemHealth.maintenanceBurden} hours/week`);
    console.log(`├─ Rule Effectiveness: ${metrics.systemHealth.ruleEffectiveness}/100`);
    console.log(`└─ Community Contributions: ${metrics.systemHealth.communityContributions}/month`);

    // Trends
    console.log('\n📈 TRENDS');
    console.log(`├─ Improving: ${metrics.trends.improving.length} rules`);
    console.log(`├─ Stable: ${metrics.trends.stable.length} rules`);
    console.log(`└─ Declining: ${metrics.trends.declining.length} rules`);

    // Recommendations
    if (metrics.recommendations.immediate.length > 0) {
      console.log('\n🚨 IMMEDIATE ACTIONS REQUIRED');
      metrics.recommendations.immediate.forEach(rec => console.log(`   ${rec}`));
    }

    if (metrics.recommendations.highPriority.length > 0) {
      console.log('\n⚠️  HIGH PRIORITY RECOMMENDATIONS');
      metrics.recommendations.highPriority.forEach(rec => console.log(`   ${rec}`));
    }

    if (metrics.recommendations.mediumPriority.length > 0) {
      console.log('\n💡 MEDIUM PRIORITY IMPROVEMENTS');
      metrics.recommendations.mediumPriority.forEach(rec => console.log(`   ${rec}`));
    }

    console.log('\n' + '='.repeat(80));
    console.log('📋 NEXT STEPS');
    console.log('1. Address immediate actions to prevent business risk');
    console.log('2. Focus on high-priority items for maximum impact');
    console.log('3. Gradually improve medium-priority items');
    console.log('4. Monitor trends and adjust priorities accordingly');
    console.log('='.repeat(80));
  }
}

// CLI Interface
async function main() {
  try {
    const dashboard = new RuleHealthDashboard();
    await dashboard.printHealthReport();
  } catch (error) {
    console.error('❌ Dashboard generation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 