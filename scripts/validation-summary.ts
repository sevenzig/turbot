#!/usr/bin/env node

/**
 * Validation Summary Script
 * 
 * Runs all validation checks and provides a comprehensive overview:
 * - Quick rule check
 * - Business alignment validation
 * - Overall system health
 */

import { QuickRuleChecker } from './quick-rule-check.js';
import { BusinessValidator } from './business-validation.js';

interface ValidationSummary {
  overall: {
    success: boolean;
    score: number;
    status: 'excellent' | 'good' | 'needs-attention' | 'critical';
  };
  quick: {
    success: boolean;
    score: number;
    issues: number;
    warnings: number;
  };
  business: {
    success: boolean;
    score: number;
    smbReadiness: string;
    issues: number;
  };
  recommendations: string[];
}

class ValidationSummaryRunner {
  async runAllValidations(): Promise<ValidationSummary> {
    console.log('🚀 Running comprehensive validation suite...\n');

    // Run quick check
    console.log('⚡ Running quick validation...');
    const quickChecker = new QuickRuleChecker();
    const quickResult = await quickChecker.runQuickCheck();

    console.log('\n' + '='.repeat(50) + '\n');

    // Run business validation
    console.log('🏢 Running business validation...');
    const businessValidator = new BusinessValidator();
    const businessResult = await businessValidator.validateBusinessAlignment();

    // Calculate overall summary
    const summary = this.calculateSummary(quickResult, businessResult);

    return summary;
  }

  private calculateSummary(quickResult: any, businessResult: any): ValidationSummary {
    const overallScore = Math.round((quickResult.score + businessResult.businessScore) / 2);
    const overallSuccess = quickResult.success && businessResult.success;
    
    let status: 'excellent' | 'good' | 'needs-attention' | 'critical';
    if (overallScore >= 90) status = 'excellent';
    else if (overallScore >= 75) status = 'good';
    else if (overallScore >= 60) status = 'needs-attention';
    else status = 'critical';

    // Combine recommendations
    const recommendations = [
      ...quickResult.recommendations,
      ...businessResult.recommendations
    ].filter((rec, index, arr) => arr.indexOf(rec) === index); // Remove duplicates

    return {
      overall: {
        success: overallSuccess,
        score: overallScore,
        status
      },
      quick: {
        success: quickResult.success,
        score: quickResult.score,
        issues: quickResult.issues.length,
        warnings: quickResult.warnings.length
      },
      business: {
        success: businessResult.success,
        score: businessResult.businessScore,
        smbReadiness: businessResult.smbReadiness,
        issues: businessResult.issues.length
      },
      recommendations
    };
  }

  printSummary(summary: ValidationSummary): void {
    console.log('\n' + '='.repeat(70));
    console.log('📊 COMPREHENSIVE VALIDATION SUMMARY');
    console.log('='.repeat(70));

    // Overall status
    const statusIcon = summary.overall.success ? '✅' : '❌';
    const statusColor = summary.overall.status === 'excellent' ? '🟢' : 
                       summary.overall.status === 'good' ? '🟡' : 
                       summary.overall.status === 'needs-attention' ? '🟠' : '🔴';

    console.log(`\n${statusIcon} Overall Status: ${summary.overall.status.toUpperCase()} ${statusColor}`);
    console.log(`📊 Combined Score: ${summary.overall.score}/100`);

    // Quick validation results
    console.log('\n📋 QUICK VALIDATION:');
    console.log(`   Score: ${summary.quick.score}/100`);
    console.log(`   Status: ${summary.quick.success ? 'PASSING ✅' : 'NEEDS ATTENTION ⚠️'}`);
    console.log(`   Issues: ${summary.quick.issues} critical, ${summary.quick.warnings} warnings`);

    // Business validation results
    console.log('\n🏢 BUSINESS VALIDATION:');
    console.log(`   Score: ${summary.business.score}/100`);
    console.log(`   Status: ${summary.business.success ? 'BUSINESS-READY ✅' : 'NEEDS ALIGNMENT ⚠️'}`);
    console.log(`   SMB Readiness: ${summary.business.smbReadiness.toUpperCase()}`);
    console.log(`   Issues: ${summary.business.issues} found`);

    // Recommendations
    if (summary.recommendations.length > 0) {
      console.log('\n💡 TOP RECOMMENDATIONS:');
      summary.recommendations.slice(0, 5).forEach((rec, i) => {
        console.log(`   ${i + 1}. ${rec}`);
      });
      
      if (summary.recommendations.length > 5) {
        console.log(`   ... and ${summary.recommendations.length - 5} more`);
      }
    }

    // Next steps
    console.log('\n🎯 NEXT STEPS:');
    if (summary.overall.success) {
      console.log('   🎉 Rules are in excellent shape!');
      console.log('   📈 Consider running full health dashboard: npm run rule-health-report');
      console.log('   🔄 Set up automated validation in CI/CD pipeline');
    } else {
      console.log('   🚨 Address critical issues first');
      console.log('   📝 Run detailed validation: npm run validate-rules');
      console.log('   🏢 Focus on business alignment improvements');
    }

    // Development workflow
    console.log('\n🛠️  DEVELOPMENT WORKFLOW:');
    console.log('   Daily: npm run validate-rules:quick');
    console.log('   Pre-commit: npm run quality-check');
    console.log('   Weekly: npm run quality-check:full');
    console.log('   Monthly: npm run rule-health-report');

    console.log('\n' + '='.repeat(70));
  }

  getExitCode(summary: ValidationSummary): number {
    if (summary.overall.success) return 0;
    if (summary.overall.status === 'critical') return 2;
    return 1;
  }
}

async function main() {
  const runner = new ValidationSummaryRunner();
  
  try {
    const summary = await runner.runAllValidations();
    
    console.log('\n' + '='.repeat(50) + '\n');
    
    runner.printSummary(summary);
    
    const exitCode = runner.getExitCode(summary);
    process.exit(exitCode);
    
  } catch (error) {
    console.error('❌ Validation summary failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { ValidationSummaryRunner }; 